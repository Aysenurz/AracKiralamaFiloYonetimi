using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Bakimlar
{
    public int BakimId { get; set; }

    public int AracId { get; set; }

    public DateTime BakimTarihi { get; set; }

    public string? BakimTipi { get; set; }

    public string? Aciklama { get; set; }

    public decimal? Tutar { get; set; }

    public virtual Araclar Arac { get; set; } = null!;
}
