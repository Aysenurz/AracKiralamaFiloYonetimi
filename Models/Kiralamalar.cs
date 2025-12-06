using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Kiralamalar
{
    public int KiralamaId { get; set; }

    public int MusteriId { get; set; }

    public int AracId { get; set; }

    public int AlisSubeId { get; set; }

    public int TeslimSubeId { get; set; }

    public DateTime? AlisTarihi { get; set; }

    public DateTime? TahminiTeslimTarihi { get; set; }

    public DateTime? GercekTeslimTarihi { get; set; }

    public decimal? GunlukUcret { get; set; }

    public string? Durum { get; set; }

    public virtual Subeler AlisSube { get; set; } = null!;

    public virtual Araclar Arac { get; set; } = null!;

    public virtual ICollection<Faturalar> Faturalars { get; set; } = new List<Faturalar>();

    public virtual Musteriler Musteri { get; set; } = null!;

    public virtual Subeler TeslimSube { get; set; } = null!;
}
