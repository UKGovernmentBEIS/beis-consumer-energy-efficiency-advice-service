package uk.gov.beis.dceas.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import uk.gov.beis.dceas.service.BoilerPcdfDatabaseUpdateService;

/**
 * A scheduled job which fetches the Boiler database from
 * http://www.boilers.org.uk/data1/pcdf2012.dat
 */
public class BoilerPcdfDatabaseUpdateJob implements Job {

    private final BoilerPcdfDatabaseUpdateService service;

    @Autowired
    public BoilerPcdfDatabaseUpdateJob(BoilerPcdfDatabaseUpdateService service) {
        this.service = service;
    }

    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        service.updateDatabase();
    }
}
