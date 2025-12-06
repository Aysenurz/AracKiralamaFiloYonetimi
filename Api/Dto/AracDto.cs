namespace Api.Models.Dto
{
    public class AracDto
    {
        public int AracId { get; set; }
        public int ModelId { get; set; }   // 🔥 Filtre için gerekli
        public string Marka { get; set; }
        public string Model { get; set; }
        public string Segment { get; set; }
        public string YakitTipi { get; set; }
        public string VitesTipi { get; set; }
        public decimal GunlukFiyat { get; set; }
        public string ResimUrl { get; set; }
    }
}
