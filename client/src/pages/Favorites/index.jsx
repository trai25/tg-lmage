import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '@/store/imageStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import toast from 'react-hot-toast';
import {
  Star,
  HeartBreak,
  Image as ImageIcon,
  CloudArrowUp
} from '@phosphor-icons/react';
import ImageCard from '@/components/ImageCard';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { images, fetchImages } = useImageStore();
  const { favorites, toggleFavorite } = useFavoriteStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const favoriteImages = images.filter((img) => favorites.has(img.id));

  const copyImageUrl = (image) => {
    navigator.clipboard.writeText(window.location.origin + image.src);
    toast.success('Copied!');
  };

  const handleUnfavorite = (imageId) => {
    toggleFavorite(imageId);
    toast('Removed from stars', { icon: '💔' });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-dashed border-gray-200 pb-4">
        <div>
          <h1 className="text-4xl font-hand font-bold text-pencil rotate-slight-1">
            <Star weight="fill" className="inline text-marker-yellow mb-2" /> Starred Pages
          </h1>
          <p className="text-gray-400 font-hand mt-1 rotate-slight-n1">
            {favoriteImages.length} special memories
          </p>
        </div>
      </div>

      {favoriteImages.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <Star size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-hand text-gray-500">No stars yet!</h3>
          <p className="font-hand text-gray-400 mb-6">Go find some sketches to love.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary rotate-slight-1">
            <ImageIcon className="inline mr-2" />
            Go to Gallery
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              isFavorite={true}
              onFavorite={handleUnfavorite}
              onCopy={copyImageUrl}
              onClick={(img) => console.log('View', img)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
