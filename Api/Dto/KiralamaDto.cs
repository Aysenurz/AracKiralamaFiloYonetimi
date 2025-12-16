namespace Api.Models.Dto
{
    public class KiralamaDto
    {
        public int KiralamaId { get; set; }
        public int AracId { get; set; }
        public int MusteriId { get; set; }
        public int AlisSubeId { get; set; }
        public int TeslimSubeId { get; set; }

        public DateTime? AlisTarihi { get; set; }
        public DateTime? TahminiTeslimTarihi { get; set; }
        public DateTime? GercekTeslimTarihi { get; set; }

        public decimal? GunlukUcret { get; set; }

        public string? Durum { get; set; }

        public string? Marka { get; set; }
    public string? Model { get; set; }
    }
}
