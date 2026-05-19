using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Category;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class CategoryLogic : CategoryActions, ICategoryLogic
{
    public ServiceResponse GetAllCategories()
    {
        return GetAllCategoriesAction();
    }

    public ServiceResponse GetCategoryById(int id)
    {
        return GetCategoryByIdAction(id);
    }

    public ServiceResponse CreateCategory(CategoryCreateDto categoryCreateDto)
    {
        return CreateCategoryAction(categoryCreateDto);
    }

    public ServiceResponse UpdateCategory(int id, CategoryCreateDto categoryCreateDto)
    {
        return UpdateCategoryAction(id, categoryCreateDto);
    }

    public ServiceResponse DeleteCategory(int id)
    {
        return DeleteCategoryAction(id);
    }
}