using Repositry_Pattern.Models;

namespace Repositry_Pattern.Repositry
{
    public interface IStudents
    {
        List<StudentModel> GetAllStudents();
        StudentModel GetStudentById(int id);
    }
}
