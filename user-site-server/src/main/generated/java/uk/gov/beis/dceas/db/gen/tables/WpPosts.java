/*
 * This file is generated by jOOQ.
*/
package uk.gov.beis.dceas.db.gen.tables;


import java.sql.Timestamp;
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
import uk.gov.beis.dceas.db.gen.tables.records.WpPostsRecord;


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
public class WpPosts extends TableImpl<WpPostsRecord> {

    private static final long serialVersionUID = -1244092608;

    /**
     * The reference instance of <code>wp_posts</code>
     */
    public static final WpPosts WP_POSTS = new WpPosts();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<WpPostsRecord> getRecordType() {
        return WpPostsRecord.class;
    }

    /**
     * The column <code>wp_posts.id</code>.
     */
    public final TableField<WpPostsRecord, Integer> ID = createField("id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_author</code>.
     */
    public final TableField<WpPostsRecord, Integer> POST_AUTHOR = createField("post_author", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_date</code>.
     */
    public final TableField<WpPostsRecord, Timestamp> POST_DATE = createField("post_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_date_gmt</code>.
     */
    public final TableField<WpPostsRecord, Timestamp> POST_DATE_GMT = createField("post_date_gmt", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_content</code>.
     */
    public final TableField<WpPostsRecord, String> POST_CONTENT = createField("post_content", org.jooq.impl.SQLDataType.CLOB.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_title</code>.
     */
    public final TableField<WpPostsRecord, String> POST_TITLE = createField("post_title", org.jooq.impl.SQLDataType.CLOB.nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_status</code>.
     */
    public final TableField<WpPostsRecord, String> POST_STATUS = createField("post_status", org.jooq.impl.SQLDataType.VARCHAR.length(20).nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_name</code>.
     */
    public final TableField<WpPostsRecord, String> POST_NAME = createField("post_name", org.jooq.impl.SQLDataType.VARCHAR.length(200).nullable(false), this, "");

    /**
     * The column <code>wp_posts.post_type</code>.
     */
    public final TableField<WpPostsRecord, String> POST_TYPE = createField("post_type", org.jooq.impl.SQLDataType.VARCHAR.length(20).nullable(false), this, "");

    /**
     * Create a <code>wp_posts</code> table reference
     */
    public WpPosts() {
        this("wp_posts", null);
    }

    /**
     * Create an aliased <code>wp_posts</code> table reference
     */
    public WpPosts(String alias) {
        this(alias, WP_POSTS);
    }

    private WpPosts(String alias, Table<WpPostsRecord> aliased) {
        this(alias, aliased, null);
    }

    private WpPosts(String alias, Table<WpPostsRecord> aliased, Field<?>[] parameters) {
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
    public UniqueKey<WpPostsRecord> getPrimaryKey() {
        return Keys.PK_WP_POSTS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<WpPostsRecord>> getKeys() {
        return Arrays.<UniqueKey<WpPostsRecord>>asList(Keys.PK_WP_POSTS);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public WpPosts as(String alias) {
        return new WpPosts(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public WpPosts rename(String name) {
        return new WpPosts(name, null);
    }
}
