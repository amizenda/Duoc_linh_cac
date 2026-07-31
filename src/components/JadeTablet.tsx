type JadeTabletProps = {
  children: React.ReactNode;
  className?: string;
};

// Bia đá ngọc: khung viền vàng ánh kim ôm quanh thân đá cẩm thạch xanh
// đậm, vân đá giả lập bằng radial-gradient lệch tâm và 4 chấm kim cương
// vàng ở góc (cùng motif NavDot của Header) — dựng hoàn toàn bằng CSS,
// không phụ thuộc ảnh raster.
export function JadeTablet({ children, className = '' }: JadeTabletProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative rounded-[6px] p-[3px]"
        style={{
          background:
            'linear-gradient(135deg, #D4AF37 0%, #F3ECC7 25%, #9C7A24 50%, #F3ECC7 75%, #D4AF37 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[4px] px-6 py-6 md:px-10 md:py-8"
          style={{
            background:
              'linear-gradient(160deg, #234438 0%, #16281f 55%, #0d1a14 100%)',
            boxShadow:
              'inset 0 0 40px rgba(0,0,0,0.55), inset 0 2px 6px rgba(255,255,255,0.06)',
          }}
        >
          {/* Vân đá giả lập */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.08), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(212,175,55,0.05), transparent 55%)',
            }}
          />

          {/* Chấm kim cương vàng 4 góc */}
          <span
            className="absolute left-2 top-2 h-[10px] w-[10px] rotate-45 bg-[#D4AF37]"
            aria-hidden="true"
          />
          <span
            className="absolute right-2 top-2 h-[10px] w-[10px] rotate-45 bg-[#D4AF37]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-2 left-2 h-[10px] w-[10px] rotate-45 bg-[#D4AF37]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-2 right-2 h-[10px] w-[10px] rotate-45 bg-[#D4AF37]"
            aria-hidden="true"
          />

          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
