/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;

import uk.gov.beis.dceas.db.gen.tables.QrtzLocks;


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
public class QrtzLocksRecord extends UpdatableRecordImpl<QrtzLocksRecord> implements Record2<String, String> {

    private static final long serialVersionUID = 1511182125;

    /**
     * Setter for <code>qrtz_locks.sched_name</code>.
     */
    public QrtzLocksRecord setSchedName(String value) {
        set(0, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_locks.sched_name</code>.
     */
    public String getSchedName() {
        return (String) get(0);
    }

    /**
     * Setter for <code>qrtz_locks.lock_name</code>.
     */
    public QrtzLocksRecord setLockName(String value) {
        set(1, value);
        return this;
    }

    /**
     * Getter for <code>qrtz_locks.lock_name</code>.
     */
    public String getLockName() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record2<String, String> key() {
        return (Record2) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<String, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<String, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return QrtzLocks.QRTZ_LOCKS.SCHED_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return QrtzLocks.QRTZ_LOCKS.LOCK_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value1() {
        return getSchedName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getLockName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzLocksRecord value1(String value) {
        setSchedName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzLocksRecord value2(String value) {
        setLockName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzLocksRecord values(String value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached QrtzLocksRecord
     */
    public QrtzLocksRecord() {
        super(QrtzLocks.QRTZ_LOCKS);
    }

    /**
     * Create a detached, initialised QrtzLocksRecord
     */
    public QrtzLocksRecord(String schedName, String lockName) {
        super(QrtzLocks.QRTZ_LOCKS);

        set(0, schedName);
        set(1, lockName);
    }
}
