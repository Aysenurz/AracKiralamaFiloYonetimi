using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Araclar
{
    public int AracId { get; set; }

    public int ModelId { get; set; }

    public string Plaka { get; set; } = null!;

    public string? SasiNo { get; set; }

    public int? Km { get; set; }

    public string? Renk { get; set; }

    public string? Durum { get; set; }

    public DateTime? AlisTarihi { get; set; }

    public int? GuncelSubeId { get; set; }

    public virtual ICollection<Bakimlar> Bakimlars { get; set; } = new List<Bakimlar>();

    public virtual Subeler? GuncelSube { get; set; }

    public virtual ICollection<Kiralamalar> Kiralamalars { get; set; } = new List<Kiralamalar>();

    public virtual AracModelBilgileri Model { get; set; } = null!;

    public virtual ICollection<Rezervasyonlar> Rezervasyonlars { get; set; } = new List<Rezervasyonlar>();
}
