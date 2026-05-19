using VLM.Domain.Models.Category;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface ICategoryLogic
{
    ServiceResponse GetAllCategories();
    ServiceResponse GetCategoryById(int id);
    ServiceResponse CreateCategory(CategoryCreateDto categoryCreateDto);
    ServiceResponse UpdateCategory(int id, CategoryCreateDto categoryCreateDto);
    ServiceResponse DeleteCategory(int id);
}