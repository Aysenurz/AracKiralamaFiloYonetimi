using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class AracModelBilgileri
{
    public int ModelId { get; set; }

    public string Marka { get; set; } = null!;

    public string Model { get; set; } = null!;

    public int Yil { get; set; }

    public string? Segment { get; set; }

    public string? YakitTipi { get; set; }

    public string? VitesTipi { get; set; }

    public virtual ICollection<Araclar> Araclars { get; set; } = new List<Araclar>();
}
