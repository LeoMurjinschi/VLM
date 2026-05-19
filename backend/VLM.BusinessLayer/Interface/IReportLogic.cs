using VLM.Domain.Models.Report;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IReportLogic
{
    ServiceResponse GetAllReports();
    ServiceResponse GetReportById(int id);
    ServiceResponse CreateReport(ReportCreateDto reportCreateDto);
    ServiceResponse UpdateReport(int id, ReportCreateDto reportCreateDto);
    ServiceResponse DeleteReport(int id);
}