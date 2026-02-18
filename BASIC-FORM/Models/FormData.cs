namespace BASIC_FORM.Models
{
    public class FormData
    {
        public string name { get; set; }
        public int age { get; set; }
        public Gender Gender { get; set; }
        public string Married { get; set; }
    }
    public enum Gender
    {
        Male,Female
    }
}
