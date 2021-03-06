/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;

import uk.gov.beis.dceas.db.gen.DefaultSchema;
import uk.gov.beis.dceas.db.gen.Keys;
import uk.gov.beis.dceas.db.gen.tables.records.QrtzPausedTriggerGrpsRecord;


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
public class QrtzPausedTriggerGrps extends TableImpl<QrtzPausedTriggerGrpsRecord> {

    private static final long serialVersionUID = -952069918;

    /**
     * The reference instance of <code>qrtz_paused_trigger_grps</code>
     */
    public static final QrtzPausedTriggerGrps QRTZ_PAUSED_TRIGGER_GRPS = new QrtzPausedTriggerGrps();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<QrtzPausedTriggerGrpsRecord> getRecordType() {
        return QrtzPausedTriggerGrpsRecord.class;
    }

    /**
     * The column <code>qrtz_paused_trigger_grps.sched_name</code>.
     */
    public final TableField<QrtzPausedTriggerGrpsRecord, String> SCHED_NAME = createField("sched_name", org.jooq.impl.SQLDataType.VARCHAR.length(120).nullable(false), this, "");

    /**
     * The column <code>qrtz_paused_trigger_grps.trigger_group</code>.
     */
    public final TableField<QrtzPausedTriggerGrpsRecord, String> TRIGGER_GROUP = createField("trigger_group", org.jooq.impl.SQLDataType.VARCHAR.length(200).nullable(false), this, "");

    /**
     * Create a <code>qrtz_paused_trigger_grps</code> table reference
     */
    public QrtzPausedTriggerGrps() {
        this("qrtz_paused_trigger_grps", null);
    }

    /**
     * Create an aliased <code>qrtz_paused_trigger_grps</code> table reference
     */
    public QrtzPausedTriggerGrps(String alias) {
        this(alias, QRTZ_PAUSED_TRIGGER_GRPS);
    }

    private QrtzPausedTriggerGrps(String alias, Table<QrtzPausedTriggerGrpsRecord> aliased) {
        this(alias, aliased, null);
    }

    private QrtzPausedTriggerGrps(String alias, Table<QrtzPausedTriggerGrpsRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return DefaultSchema.DEFAULT_SCHEMA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<QrtzPausedTriggerGrpsRecord> getPrimaryKey() {
        return Keys.PK_QRTZ_PAUSED_TRIGGER_GRPS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<QrtzPausedTriggerGrpsRecord>> getKeys() {
        return Arrays.<UniqueKey<QrtzPausedTriggerGrpsRecord>>asList(Keys.PK_QRTZ_PAUSED_TRIGGER_GRPS);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QrtzPausedTriggerGrps as(String alias) {
        return new QrtzPausedTriggerGrps(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public QrtzPausedTriggerGrps rename(String name) {
        return new QrtzPausedTriggerGrps(name, null);
    }
}
