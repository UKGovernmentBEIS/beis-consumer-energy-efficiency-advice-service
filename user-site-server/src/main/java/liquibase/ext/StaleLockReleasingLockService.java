package liquibase.ext;

import liquibase.exception.DatabaseException;
import liquibase.exception.LockException;
import liquibase.lockservice.DatabaseChangeLogLock;
import liquibase.lockservice.StandardLockService;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;

// Releases stale changelog locks, to mitigate an issue where the server fails to boot because of orphaned locks.
// See 'Known issue: "waiting for changelog lock"' in the 'Operational Support' documentation for more details.
// This solution is adapted from here: https://stackoverflow.com/a/55525305/1213714
@SuppressWarnings("unused")
public class StaleLockReleasingLockService extends StandardLockService {

    // Locks go stale after 10 minutes.
    private static final Duration MAX_LOCK_AGE = Duration.ofMinutes(10);

    @Override
    public int getPriority() {
        return super.getPriority() + 1;
    }

    @Override
    public boolean acquireLock() throws LockException {
        releaseStaleLocks();
        return super.acquireLock();
    }

    private void releaseStaleLocks() throws LockException {
        DatabaseChangeLogLock[] locks = listLocks();
        if (locks.length == 0) {
            return;
        }
        if (!Arrays.stream(locks).allMatch(this::isStale)) {
            return;
        }
        try {
            super.forceReleaseLock();
        } catch (DatabaseException e) {
            throw new LockException("Could not force release of database changelog lock.", e);
        }
    }

    private boolean isStale(DatabaseChangeLogLock lock) {
        Duration lockAge = Duration.between(lock.getLockGranted().toInstant(), Instant.now());
        return lockAge.compareTo(MAX_LOCK_AGE) > 0;
    }
}
