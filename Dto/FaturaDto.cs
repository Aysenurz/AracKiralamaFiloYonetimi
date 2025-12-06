namespace Api.Models.Dto
{
    public class FaturaDto
    {
        public int FaturaId { get; set; }
        public int KiralamaId { get; set; }
        public decimal? Tutar { get; set; }
        public DateTime FaturaTarihi { get; set; }
    }
}
