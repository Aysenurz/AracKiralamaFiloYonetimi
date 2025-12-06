using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Musteriler
{
    public int MusteriId { get; set; }

    public string? AdSoyad { get; set; }

    public string? TcNo { get; set; }

    public string? Telefon { get; set; }

    public string? Email { get; set; }

    public string? Adres { get; set; }

    public string? EhliyetNo { get; set; }

    public DateOnly? EhliyetTarihi { get; set; }

    public virtual ICollection<Kiralamalar> Kiralamalars { get; set; } = new List<Kiralamalar>();

    public virtual ICollection<Rezervasyonlar> Rezervasyonlars { get; set; } = new List<Rezervasyonlar>();
}
