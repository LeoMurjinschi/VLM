using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Category;
using VLM.Domain.Models.Category;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class CategoryActions
{
    private readonly VlmDbContext _dbContext;

    public CategoryActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllCategoriesAction()
    {
        try
        {
            var categories = _dbContext.Categories
                .Select(entity => new CategoryInfoDto
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Description = entity.Description,
                    Icon = entity.Icon,
                    IsActive = entity.IsActive,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = categories
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving categories: {e.Message}"
            };
        }
    }

    public ServiceResponse GetCategoryByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Categories.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category not found"
                };

            var dto = new CategoryInfoDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Icon = entity.Icon,
                IsActive = entity.IsActive,
                CreatedDate = entity.CreatedDate
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = dto
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving category: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateCategoryAction(CategoryCreateDto categoryCreateDto)
    {
        try
        {
            var entity = new CategoryEntity
            {
                Name = categoryCreateDto.Name,
                Description = categoryCreateDto.Description,
                Icon = categoryCreateDto.Icon,
                IsActive = categoryCreateDto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Categories.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Category created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating category: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateCategoryAction(int id, CategoryCreateDto categoryCreateDto)
    {
        try
        {
            var entity = _dbContext.Categories.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category not found"
                };

            entity.Name = categoryCreateDto.Name;
            entity.Description = categoryCreateDto.Description;
            entity.Icon = categoryCreateDto.Icon;
            entity.IsActive = categoryCreateDto.IsActive;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Category updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating category: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteCategoryAction(int id)
    {
        try
        {
            var entity = _dbContext.Categories.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Category not found"
                };

            _dbContext.Categories.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Category deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting category: {e.Message}"
            };
        }
    }
}
