using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Faturalar
{
    public int FaturaId { get; set; }

    public int KiralamaId { get; set; }

    public decimal? Tutar { get; set; }

    public DateTime FaturaTarihi { get; set; }

    public virtual Kiralamalar Kiralama { get; set; } = null!;
}
