using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Report;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class ReportLogic : ReportActions, IReportLogic
{
    public ServiceResponse GetAllReports()
    {
        return GetAllReportsAction();
    }

    public ServiceResponse GetReportById(int id)
    {
        return GetReportByIdAction(id);
    }

    public ServiceResponse CreateReport(ReportCreateDto reportCreateDto)
    {
        return CreateReportAction(reportCreateDto);
    }

    public ServiceResponse UpdateReport(int id, ReportCreateDto reportCreateDto)
    {
        return UpdateReportAction(id, reportCreateDto);
    }

    public ServiceResponse DeleteReport(int id)
    {
        return DeleteReportAction(id);
    }
}