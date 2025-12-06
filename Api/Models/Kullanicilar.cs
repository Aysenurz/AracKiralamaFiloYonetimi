using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Kullanicilar
{
    public int KullaniciId { get; set; }

    public string AdSoyad { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string SifreHash { get; set; } = null!;

    public string Rol { get; set; } = null!;
}
