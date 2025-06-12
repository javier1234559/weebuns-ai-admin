import BannerCard from "./BannerCard";

export default function BannerList({
  banners,
  onEdit,
  onDelete,
  loading,
}: {
  banners: any[];
  onEdit: (banner: any) => void;
  onDelete: (banner: any) => void;
  loading?: boolean;
}) {
  if (!banners?.length) return <div>Không có banner nào.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.map((banner) => (
        <BannerCard
          key={banner.id}
          banner={banner}
          onEdit={() => onEdit(banner)}
          onDelete={() => onDelete(banner)}
          loading={loading}
        />
      ))}
    </div>
  );
}
