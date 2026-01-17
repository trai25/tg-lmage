import { useEffect, useState } from 'react';
import { useTagStore } from '@/store/tagStore';
import toast from 'react-hot-toast';
import {
  Tag,
  Plus,
  Pencil,
  Trash,
  Check,
  X,
  Palette
} from '@phosphor-icons/react';

const TagsPage = () => {
  const { tags, isLoading, fetchTags, createTag, updateTag, deleteTag } = useTagStore();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#fef08a'); // Default Yellow

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) return toast.error('Tag needs a name!');

    const result = await createTag({ name: tagName, color: tagColor });
    if (result.success) {
      toast.success('Sticky note added!');
      setShowCreateModal(false);
      setTagName('');
      setTagColor('#fef08a');
    } else {
      toast.error(result.error);
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) return toast.error('Tag needs a name!');

    const result = await updateTag(editingTag.id, { name: tagName, color: tagColor });
    if (result.success) {
      toast.success('Note rewritten!');
      setShowEditModal(false);
      setEditingTag(null);
      setTagName('');
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async (tagId) => {
    if (window.confirm('Crumple up this note and throw it away?')) {
      const result = await deleteTag(tagId);
      if (result.success) {
        toast.success('Note trashed.');
      } else {
        toast.error(result.error);
      }
    }
  };

  const TagModal = ({ title, onSubmit, onClose }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white p-6 max-w-sm w-full shadow-sketch rotate-slight-1 relative border border-gray-200" 
        onClick={e => e.stopPropagation()}
      >
         <div className="tape-top"></div>
         
         <h3 className="text-2xl font-hand font-bold text-pencil mb-6 text-center">{title}</h3>
         
         <form onSubmit={onSubmit} className="space-y-4">
           <div>
             <label className="block font-hand text-lg text-gray-500 mb-1">Label</label>
             <input
               type="text"
               className="input-hand w-full text-xl"
               value={tagName}
               onChange={(e) => setTagName(e.target.value)}
               placeholder="Important Stuff"
               autoFocus
             />
           </div>
           <div>
             <label className="block font-hand text-lg text-gray-500 mb-1">Color Marker</label>
             <div className="flex gap-2 flex-wrap">
               {['#fef08a', '#fbcfe8', '#bae6fd', '#bbf7d0', '#e9d5ff'].map(color => (
                 <button
                   key={color}
                   type="button"
                   onClick={() => setTagColor(color)}
                   className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${tagColor === color ? 'border-pencil scale-110 shadow-sm' : 'border-transparent'}`}
                   style={{ backgroundColor: color }}
                 />
               ))}
               <input 
                 type="color" 
                 value={tagColor} 
                 onChange={(e) => setTagColor(e.target.value)}
                 className="w-8 h-8 opacity-0 absolute"
               />
               <button type="button" className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-pencil hover:border-pencil">
                 <Palette size={16} />
               </button>
             </div>
           </div>
           
           <div className="flex justify-end gap-3 pt-4 border-t-2 border-dashed border-gray-100 mt-6">
             <button type="button" onClick={onClose} className="btn-doodle text-sm px-4">
               Cancel
             </button>
             <button type="submit" className="btn-primary text-sm px-4">
               Save Note
             </button>
           </div>
         </form>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8 border-b-2 border-dashed border-gray-200 pb-4">
        <div>
          <h1 className="text-4xl font-hand font-bold text-pencil rotate-slight-1">
            <Tag className="inline mr-2" weight="duotone" /> Tags
          </h1>
          <p className="text-gray-400 font-hand mt-1 rotate-slight-n1">
            Sticky notes for your brain
          </p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-1 rotate-1">
          <Plus size={20} weight="bold" /> New Note
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 font-hand text-xl text-pencil animate-bounce">Checking corkboard...</div>
      ) : tags.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
           <Tag size={64} className="mx-auto text-gray-300 mb-4" />
           <p className="font-hand text-xl text-gray-400">No sticky notes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {tags.map((tag, index) => (
            <div
              key={tag.id}
              className={`
                aspect-square p-4 shadow-sketch relative flex flex-col justify-between transition-transform hover:scale-105 group
                ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
              `}
              style={{ backgroundColor: tag.color }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm border-2 border-white/50 shadow-inner"></div> {/* Pushpin */}
              
              <div className="mt-4 flex-1 flex flex-col items-center justify-center text-center">
                 <h3 className="font-hand text-2xl font-bold text-pencil break-words w-full">{tag.name}</h3>
                 <p className="font-hand text-sm text-pencil/60 mt-1">{tag.count || 0} sketches</p>
              </div>

              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(tag)} className="p-2 hover:bg-white/50 rounded-full text-pencil" title="Rewrite">
                  <Pencil size={20} />
                </button>
                <button onClick={() => handleDelete(tag.id)} className="p-2 hover:bg-white/50 rounded-full text-red-500" title="Trash">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <TagModal 
          title="New Sticky Note" 
          onSubmit={handleCreate} 
          onClose={() => setShowCreateModal(false)} 
        />
      )}

      {showEditModal && (
        <TagModal 
          title="Rewrite Note" 
          onSubmit={handleUpdate} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </div>
  );
};

export default TagsPage;
