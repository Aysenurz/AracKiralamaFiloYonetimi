using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Api.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AracModelBilgileri> AracModelBilgileris { get; set; }

    public virtual DbSet<Araclar> Araclars { get; set; }

    public virtual DbSet<Bakimlar> Bakimlars { get; set; }

    public virtual DbSet<Faturalar> Faturalars { get; set; }

    public virtual DbSet<Kiralamalar> Kiralamalars { get; set; }

    public virtual DbSet<Kullanicilar> Kullanicilars { get; set; }

    public virtual DbSet<Musteriler> Musterilers { get; set; }

    public virtual DbSet<Rezervasyonlar> Rezervasyonlars { get; set; }

    public virtual DbSet<Subeler> Subelers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=AracKiralamaFiloYonetimi;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AracModelBilgileri>(entity =>
            {
                entity.HasKey(e => e.ModelId).HasName("PK__AracMode__E8D7A1CCA8CDFAD9");

                entity.ToTable("AracModelBilgileri", "FILO");

                entity.Property(e => e.ModelId).HasColumnName("ModelID");
                entity.Property(e => e.Marka).HasMaxLength(50);
                entity.Property(e => e.Model).HasMaxLength(50);
                entity.Property(e => e.Segment).HasMaxLength(50);
                entity.Property(e => e.VitesTipi).HasMaxLength(20);
                entity.Property(e => e.YakitTipi).HasMaxLength(20);

                // ⭐ EKLEDİĞİMİZ ALANLAR
                entity.Property(e => e.GunlukFiyat).HasColumnType("decimal(18,2)");
                entity.Property(e => e.ResimUrl).HasColumnType("nvarchar(max)");
            });

        modelBuilder.Entity<Araclar>(entity =>
        {
            entity.HasKey(e => e.AracId).HasName("PK__Araclar__1E09A830056413DC");

            entity.ToTable("Araclar", "FILO");

            entity.Property(e => e.AracId).HasColumnName("AracID");
            entity.Property(e => e.AlisTarihi).HasColumnType("datetime");
            entity.Property(e => e.Durum).HasMaxLength(20);
            entity.Property(e => e.GuncelSubeId).HasColumnName("GuncelSubeID");
            entity.Property(e => e.ModelId).HasColumnName("ModelID");
            entity.Property(e => e.Plaka).HasMaxLength(15);
            entity.Property(e => e.Renk).HasMaxLength(20);
            entity.Property(e => e.SasiNo).HasMaxLength(50);

            entity.HasOne(d => d.GuncelSube).WithMany(p => p.Araclars)
                .HasForeignKey(d => d.GuncelSubeId)
                .HasConstraintName("FK__Araclar__GuncelS__3C69FB99");

            entity.HasOne(d => d.Model).WithMany(p => p.Araclars)
                .HasForeignKey(d => d.ModelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Araclar__ModelID__3B75D760");
        });

        modelBuilder.Entity<Bakimlar>(entity =>
        {
            entity.HasKey(e => e.BakimId).HasName("PK__Bakimlar__7227287E783F25C5");

            entity.ToTable("Bakimlar", "FILO");

            entity.Property(e => e.BakimId).HasColumnName("BakimID");
            entity.Property(e => e.Aciklama).HasMaxLength(200);
            entity.Property(e => e.AracId).HasColumnName("AracID");
            entity.Property(e => e.BakimTarihi).HasColumnType("datetime");
            entity.Property(e => e.BakimTipi).HasMaxLength(50);
            entity.Property(e => e.Tutar).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Arac).WithMany(p => p.Bakimlars)
                .HasForeignKey(d => d.AracId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Bakimlar__AracID__3F466844");
        });

        modelBuilder.Entity<Faturalar>(entity =>
        {
            entity.HasKey(e => e.FaturaId).HasName("PK__Faturala__84301C40994C9B46");

            entity.ToTable("Faturalar", "OPERASYON");

            entity.Property(e => e.FaturaId).HasColumnName("FaturaID");
            entity.Property(e => e.FaturaTarihi)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.KiralamaId).HasColumnName("KiralamaID");
            entity.Property(e => e.Tutar).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Kiralama).WithMany(p => p.Faturalars)
                .HasForeignKey(d => d.KiralamaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Faturalar__Kiral__534D60F1");
        });

        modelBuilder.Entity<Kiralamalar>(entity =>
        {
            entity.HasKey(e => e.KiralamaId).HasName("PK__Kiralama__5EFEA0B8A87CBBE8");

            entity.ToTable("Kiralamalar", "OPERASYON");

            entity.Property(e => e.KiralamaId).HasColumnName("KiralamaID");
            entity.Property(e => e.AlisSubeId).HasColumnName("AlisSubeID");
            entity.Property(e => e.AlisTarihi).HasColumnType("datetime");
            entity.Property(e => e.AracId).HasColumnName("AracID");
            entity.Property(e => e.Durum).HasMaxLength(20);
            entity.Property(e => e.GercekTeslimTarihi).HasColumnType("datetime");
            entity.Property(e => e.GunlukUcret).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.MusteriId).HasColumnName("MusteriID");
            entity.Property(e => e.TahminiTeslimTarihi).HasColumnType("datetime");
            entity.Property(e => e.TeslimSubeId).HasColumnName("TeslimSubeID");

            entity.HasOne(d => d.AlisSube).WithMany(p => p.KiralamalarAlisSubes)
                .HasForeignKey(d => d.AlisSubeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Kiralamal__AlisS__4E88ABD4");

            entity.HasOne(d => d.Arac).WithMany(p => p.Kiralamalars)
                .HasForeignKey(d => d.AracId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Kiralamal__AracI__4D94879B");

            entity.HasOne(d => d.Musteri).WithMany(p => p.Kiralamalars)
                .HasForeignKey(d => d.MusteriId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Kiralamal__Muste__4CA06362");

            entity.HasOne(d => d.TeslimSube).WithMany(p => p.KiralamalarTeslimSubes)
                .HasForeignKey(d => d.TeslimSubeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Kiralamal__Tesli__4F7CD00D");
        });

        modelBuilder.Entity<Kullanicilar>(entity =>
        {
            entity.HasKey(e => e.KullaniciId).HasName("PK__Kullanic__E011F09B32916840");

            entity.ToTable("Kullanicilar", "OPERASYON");

            entity.Property(e => e.KullaniciId).HasColumnName("KullaniciID");
            entity.Property(e => e.AdSoyad).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Rol).HasMaxLength(20);
            entity.Property(e => e.SifreHash).HasMaxLength(200);
        });

        modelBuilder.Entity<Musteriler>(entity =>
        {
            entity.HasKey(e => e.MusteriId).HasName("PK__Musteril__72624471ECBE379A");

            entity.ToTable("Musteriler", "OPERASYON");

            entity.Property(e => e.MusteriId).HasColumnName("MusteriID");
            entity.Property(e => e.AdSoyad).HasMaxLength(100);
            entity.Property(e => e.Adres).HasMaxLength(200);
            entity.Property(e => e.EhliyetNo).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.TcNo).HasMaxLength(11);
            entity.Property(e => e.Telefon).HasMaxLength(20);
        });

        modelBuilder.Entity<Rezervasyonlar>(entity =>
        {
            entity.HasKey(e => e.RezervasyonId).HasName("PK__Rezervas__CD4DF978B1793651");

            entity.ToTable("Rezervasyonlar", "OPERASYON");

            entity.Property(e => e.RezervasyonId).HasColumnName("RezervasyonID");
            entity.Property(e => e.AlisSubeId).HasColumnName("AlisSubeID");
            entity.Property(e => e.AracId).HasColumnName("AracID");
            entity.Property(e => e.Durum).HasMaxLength(20);
            entity.Property(e => e.MusteriId).HasColumnName("MusteriID");
            entity.Property(e => e.Notlar).HasMaxLength(200);
            entity.Property(e => e.PlanlananAlisTarihi).HasColumnType("datetime");
            entity.Property(e => e.PlanlananTeslimTarihi).HasColumnType("datetime");
            entity.Property(e => e.RezervasyonTarihi)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TahminiUcret).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.TeslimSubeId).HasColumnName("TeslimSubeID");

            entity.HasOne(d => d.AlisSube).WithMany(p => p.RezervasyonlarAlisSubes)
                .HasForeignKey(d => d.AlisSubeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rezervasy__AlisS__48CFD27E");

            entity.HasOne(d => d.Arac).WithMany(p => p.Rezervasyonlars)
                .HasForeignKey(d => d.AracId)
                .HasConstraintName("FK__Rezervasy__AracI__47DBAE45");

            entity.HasOne(d => d.Musteri).WithMany(p => p.Rezervasyonlars)
                .HasForeignKey(d => d.MusteriId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rezervasy__Muste__46E78A0C");

            entity.HasOne(d => d.TeslimSube).WithMany(p => p.RezervasyonlarTeslimSubes)
                .HasForeignKey(d => d.TeslimSubeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rezervasy__Tesli__49C3F6B7");
        });

        modelBuilder.Entity<Subeler>(entity =>
        {
            entity.HasKey(e => e.SubeId).HasName("PK__Subeler__C3041019D966155F");

            entity.ToTable("Subeler", "OPERASYON");

            entity.Property(e => e.SubeId).HasColumnName("SubeID");
            entity.Property(e => e.Adres).HasMaxLength(200);
            entity.Property(e => e.Il).HasMaxLength(50);
            entity.Property(e => e.Ilce).HasMaxLength(50);
            entity.Property(e => e.SubeAdi).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
