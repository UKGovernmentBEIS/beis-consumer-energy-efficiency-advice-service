/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;

import uk.gov.beis.dceas.db.gen.tables.Boilers;
import uk.gov.beis.dceas.db.gen.tables.Databasechangelog;
import uk.gov.beis.dceas.db.gen.tables.Databasechangeloglock;
import uk.gov.beis.dceas.db.gen.tables.QrtzBlobTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzCalendars;
import uk.gov.beis.dceas.db.gen.tables.QrtzCronTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzFiredTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzJobDetails;
import uk.gov.beis.dceas.db.gen.tables.QrtzLocks;
import uk.gov.beis.dceas.db.gen.tables.QrtzPausedTriggerGrps;
import uk.gov.beis.dceas.db.gen.tables.QrtzSchedulerState;
import uk.gov.beis.dceas.db.gen.tables.QrtzSimpleTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzSimpropTriggers;
import uk.gov.beis.dceas.db.gen.tables.QrtzTriggers;
import uk.gov.beis.dceas.db.gen.tables.UserState;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class DefaultSchema extends SchemaImpl {

    private static final long serialVersionUID = 139594046;

    /**
     * The reference instance of <code></code>
     */
    public static final DefaultSchema DEFAULT_SCHEMA = new DefaultSchema();

    /**
     * The table <code>boilers</code>.
     */
    public final Boilers BOILERS = uk.gov.beis.dceas.db.gen.tables.Boilers.BOILERS;

    /**
     * The table <code>databasechangelog</code>.
     */
    public final Databasechangelog DATABASECHANGELOG = uk.gov.beis.dceas.db.gen.tables.Databasechangelog.DATABASECHANGELOG;

    /**
     * The table <code>databasechangeloglock</code>.
     */
    public final Databasechangeloglock DATABASECHANGELOGLOCK = uk.gov.beis.dceas.db.gen.tables.Databasechangeloglock.DATABASECHANGELOGLOCK;

    /**
     * The table <code>qrtz_blob_triggers</code>.
     */
    public final QrtzBlobTriggers QRTZ_BLOB_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS;

    /**
     * The table <code>qrtz_calendars</code>.
     */
    public final QrtzCalendars QRTZ_CALENDARS = uk.gov.beis.dceas.db.gen.tables.QrtzCalendars.QRTZ_CALENDARS;

    /**
     * The table <code>qrtz_cron_triggers</code>.
     */
    public final QrtzCronTriggers QRTZ_CRON_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzCronTriggers.QRTZ_CRON_TRIGGERS;

    /**
     * The table <code>qrtz_fired_triggers</code>.
     */
    public final QrtzFiredTriggers QRTZ_FIRED_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzFiredTriggers.QRTZ_FIRED_TRIGGERS;

    /**
     * The table <code>qrtz_job_details</code>.
     */
    public final QrtzJobDetails QRTZ_JOB_DETAILS = uk.gov.beis.dceas.db.gen.tables.QrtzJobDetails.QRTZ_JOB_DETAILS;

    /**
     * The table <code>qrtz_locks</code>.
     */
    public final QrtzLocks QRTZ_LOCKS = uk.gov.beis.dceas.db.gen.tables.QrtzLocks.QRTZ_LOCKS;

    /**
     * The table <code>qrtz_paused_trigger_grps</code>.
     */
    public final QrtzPausedTriggerGrps QRTZ_PAUSED_TRIGGER_GRPS = uk.gov.beis.dceas.db.gen.tables.QrtzPausedTriggerGrps.QRTZ_PAUSED_TRIGGER_GRPS;

    /**
     * The table <code>qrtz_scheduler_state</code>.
     */
    public final QrtzSchedulerState QRTZ_SCHEDULER_STATE = uk.gov.beis.dceas.db.gen.tables.QrtzSchedulerState.QRTZ_SCHEDULER_STATE;

    /**
     * The table <code>qrtz_simple_triggers</code>.
     */
    public final QrtzSimpleTriggers QRTZ_SIMPLE_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS;

    /**
     * The table <code>qrtz_simprop_triggers</code>.
     */
    public final QrtzSimpropTriggers QRTZ_SIMPROP_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS;

    /**
     * The table <code>qrtz_triggers</code>.
     */
    public final QrtzTriggers QRTZ_TRIGGERS = uk.gov.beis.dceas.db.gen.tables.QrtzTriggers.QRTZ_TRIGGERS;

    /**
     * The table <code>user_state</code>.
     */
    public final UserState USER_STATE = uk.gov.beis.dceas.db.gen.tables.UserState.USER_STATE;

    /**
     * No further instances allowed
     */
    private DefaultSchema() {
        super("", null);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        List result = new ArrayList();
        result.addAll(getTables0());
        return result;
    }

    private final List<Table<?>> getTables0() {
        return Arrays.<Table<?>>asList(
            Boilers.BOILERS,
            Databasechangelog.DATABASECHANGELOG,
            Databasechangeloglock.DATABASECHANGELOGLOCK,
            QrtzBlobTriggers.QRTZ_BLOB_TRIGGERS,
            QrtzCalendars.QRTZ_CALENDARS,
            QrtzCronTriggers.QRTZ_CRON_TRIGGERS,
            QrtzFiredTriggers.QRTZ_FIRED_TRIGGERS,
            QrtzJobDetails.QRTZ_JOB_DETAILS,
            QrtzLocks.QRTZ_LOCKS,
            QrtzPausedTriggerGrps.QRTZ_PAUSED_TRIGGER_GRPS,
            QrtzSchedulerState.QRTZ_SCHEDULER_STATE,
            QrtzSimpleTriggers.QRTZ_SIMPLE_TRIGGERS,
            QrtzSimpropTriggers.QRTZ_SIMPROP_TRIGGERS,
            QrtzTriggers.QRTZ_TRIGGERS,
            UserState.USER_STATE);
    }
}
