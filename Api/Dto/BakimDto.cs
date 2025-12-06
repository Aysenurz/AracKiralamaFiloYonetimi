namespace Api.Models.Dto
{
    public class BakimDto
    {
        public int BakimId { get; set; }
        public int AracId { get; set; }
        public string? BakimTipi { get; set; }
        public decimal? Tutar { get; set; }
        public DateTime BakimTarihi { get; set; }
        public string? Aciklama { get; set; }
    }
}