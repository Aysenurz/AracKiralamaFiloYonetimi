using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Rezervasyonlar
{
    public int RezervasyonId { get; set; }

    public int MusteriId { get; set; }

    public int? AracId { get; set; }

    public int AlisSubeId { get; set; }

    public int TeslimSubeId { get; set; }

    public DateTime RezervasyonTarihi { get; set; }

    public DateTime PlanlananAlisTarihi { get; set; }

    public DateTime PlanlananTeslimTarihi { get; set; }

    public string Durum { get; set; } = null!;

    public decimal? TahminiUcret { get; set; }

    public string? Notlar { get; set; }

    public virtual Subeler AlisSube { get; set; } = null!;

    public virtual Araclar? Arac { get; set; }

    public virtual Musteriler Musteri { get; set; } = null!;

    public virtual Subeler TeslimSube { get; set; } = null!;
}
