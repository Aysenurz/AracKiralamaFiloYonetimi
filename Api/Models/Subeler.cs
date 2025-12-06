using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Subeler
{
    public int SubeId { get; set; }

    public string SubeAdi { get; set; } = null!;

    public string? Il { get; set; }

    public string? Ilce { get; set; }

    public string? Adres { get; set; }

    public virtual ICollection<Araclar> Araclars { get; set; } = new List<Araclar>();

    public virtual ICollection<Kiralamalar> KiralamalarAlisSubes { get; set; } = new List<Kiralamalar>();

    public virtual ICollection<Kiralamalar> KiralamalarTeslimSubes { get; set; } = new List<Kiralamalar>();

    public virtual ICollection<Rezervasyonlar> RezervasyonlarAlisSubes { get; set; } = new List<Rezervasyonlar>();

    public virtual ICollection<Rezervasyonlar> RezervasyonlarTeslimSubes { get; set; } = new List<Rezervasyonlar>();
}
