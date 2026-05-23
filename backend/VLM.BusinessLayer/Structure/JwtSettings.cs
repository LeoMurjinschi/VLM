namespace VLM.BussinesLayer.Structure
{
    public static class JwtSettings
    {
        public const string Issuer = "VlmApi";
        public const string Audience = "VlmClients";
        public const string SecretKey = "vlm_secret_key_made_by_three_strong_guys_who_study_IT";
        public const int ExpireMinutes = 60;
    }
}