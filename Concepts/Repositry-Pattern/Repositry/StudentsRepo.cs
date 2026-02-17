using Repositry_Pattern.Models;

namespace Repositry_Pattern.Repositry
{
    public class StudentsRepo : IStudents
    {
        public List<StudentModel> GetAllStudents()
        {
            return DataSource();
        }

        public StudentModel GetStudentById(int id)
        {
            return DataSource().Where(x => x.id == id).FirstOrDefault();
        }

        private List<StudentModel> DataSource()
        {
            return new List<StudentModel>
            {
                new StudentModel{id = 1 , Name = "Sarbjeet" , age = 22},
                new StudentModel{id = 2 , Name = "Vansh" , age = 20},
                new StudentModel{id = 3 , Name = "Namya" , age = 23}

            };
        }
    }
}
