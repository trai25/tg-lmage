import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import {
  Gear,
  Bell,
  CloudArrowUp,
  ShieldCheck,
  Warning,
  CheckSquare,
  Square,
  LockKey
} from '@phosphor-icons/react';

const SettingsPage = () => {
  const { changePassword } = useAuthStore();
  
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    uploadNotifications: true,
    autoSave: true,
    compressImages: false,
    defaultPrivacy: 'public',
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword) return toast.error('Current password needed!');
    if (passwordData.newPassword.length < 6) return toast.error('New password too short!');
    if (passwordData.newPassword !== passwordData.confirmPassword) return toast.error('Passwords mismatch!');

    setIsChangingPassword(true);
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        toast.success('Secret code changed!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordSection(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to change...');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast.success('Checkbox marked!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tear out all pages and burn the book? (Delete Account)')) {
      if (window.confirm('Really? There is no going back.')) {
        toast.error('Cannot burn the book yet (Feature disabled)');
      }
    }
  };

  const ToggleItem = ({ label, description, checked, onChange }) => (
    <div className="flex items-start gap-3 py-3 border-b border-dashed border-gray-200 last:border-0 cursor-pointer group" onClick={() => onChange(!checked)}>
      <div className="mt-1 text-pencil group-hover:text-marker-blue transition-colors">
        {checked ? <CheckSquare size={24} weight="fill" /> : <Square size={24} />}
      </div>
      <div>
        <h4 className="font-hand text-xl font-bold text-pencil">{label}</h4>
        <p className="font-hand text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-hand font-bold text-pencil rotate-slight-n1">
          <Gear className="inline mr-2 animate-spin-slow" /> 
          Preferences
        </h1>
        <p className="text-gray-400 font-hand mt-1 rotate-slight-1">
          Tweaking the system...
        </p>
      </div>

      <div className="bg-white p-8 shadow-sketch border border-gray-200 relative rotate-slight-1 rounded-sm">
         {/* Tape */}
         <div className="absolute -top-3 right-1/4 w-24 h-8 bg-white/40 backdrop-blur-sm -rotate-2 shadow-tape"></div>

         <div className="space-y-8">
            {/* Notifications */}
            <section>
              <h2 className="text-2xl font-hand font-bold text-pencil mb-4 border-b-2 border-marker-yellow inline-block pr-4 rotate-slight-n1">
                <Bell className="inline mr-1" /> Notifications
              </h2>
              <div className="space-y-1">
                <ToggleItem 
                  label="Email Updates" 
                  description="Get letters via owl (email)" 
                  checked={settings.emailNotifications} 
                  onChange={(v) => handleSettingChange('emailNotifications', v)} 
                />
                <ToggleItem 
                  label="Upload Alerts" 
                  description="Ding when sketch is done" 
                  checked={settings.uploadNotifications} 
                  onChange={(v) => handleSettingChange('uploadNotifications', v)} 
                />
              </div>
            </section>

            {/* Uploads */}
            <section>
              <h2 className="text-2xl font-hand font-bold text-pencil mb-4 border-b-2 border-marker-blue inline-block pr-4 rotate-slight-1">
                <CloudArrowUp className="inline mr-1" /> Sketching
              </h2>
              <div className="space-y-1">
                <ToggleItem 
                  label="Auto-Save" 
                  description="Keep sketches in gallery automatically" 
                  checked={settings.autoSave} 
                  onChange={(v) => handleSettingChange('autoSave', v)} 
                />
                <ToggleItem 
                  label="Squish Images" 
                  description="Compress to save paper space" 
                  checked={settings.compressImages} 
                  onChange={(v) => handleSettingChange('compressImages', v)} 
                />
                
                <div className="flex items-center gap-3 py-3 border-b border-dashed border-gray-200">
                   <div className="mt-1"><Square size={24} className="opacity-0" /></div>
                   <div className="flex-1">
                     <h4 className="font-hand text-xl font-bold text-pencil">Privacy Default</h4>
                     <select 
                       className="mt-1 bg-transparent border-b-2 border-dashed border-gray-300 font-hand text-lg focus:border-pencil outline-none w-full max-w-xs"
                       value={settings.defaultPrivacy}
                       onChange={(e) => handleSettingChange('defaultPrivacy', e.target.value)}
                     >
                       <option value="public">Public (Show everyone)</option>
                       <option value="private">Private (Diary only)</option>
                     </select>
                   </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-hand font-bold text-pencil mb-4 border-b-2 border-marker-pink inline-block pr-4 rotate-slight-n1">
                <ShieldCheck className="inline mr-1" /> Security
              </h2>
              
              {!showPasswordSection ? (
                <button 
                  onClick={() => setShowPasswordSection(true)}
                  className="btn-doodle w-full text-left flex justify-between items-center"
                >
                  <span>Change Secret Code</span>
                  <LockKey />
                </button>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="bg-gray-50 p-4 border border-dashed border-gray-300 rounded relative">
                   <button 
                     type="button" 
                     onClick={() => setShowPasswordSection(false)}
                     className="absolute top-2 right-2 text-gray-400 hover:text-pencil"
                   >
                     Cancel
                   </button>
                   <div className="space-y-3">
                     <input 
                       type="password" 
                       name="currentPassword" 
                       placeholder="Old Code" 
                       className="input-hand bg-white"
                       value={passwordData.currentPassword}
                       onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                     />
                     <input 
                       type="password" 
                       name="newPassword" 
                       placeholder="New Code" 
                       className="input-hand bg-white"
                       value={passwordData.newPassword}
                       onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                     />
                     <input 
                       type="password" 
                       name="confirmPassword" 
                       placeholder="Repeat New Code" 
                       className="input-hand bg-white"
                       value={passwordData.confirmPassword}
                       onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                     />
                     <button type="submit" disabled={isChangingPassword} className="btn-primary w-full mt-2">
                       {isChangingPassword ? 'Updating...' : 'Update Code'}
                     </button>
                   </div>
                </form>
              )}
            </section>

            {/* Danger Zone */}
            <section className="pt-8">
               <button 
                 onClick={handleDeleteAccount}
                 className="w-full border-2 border-dashed border-red-200 text-red-400 font-hand text-xl py-2 hover:bg-red-50 hover:text-red-500 hover:border-red-400 transition-all rotate-slight-1"
               >
                 <Warning className="inline mb-1 mr-2" />
                 Burn this Diary (Delete Account)
               </button>
            </section>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;