'use client';

import { useState, useEffect } from 'react';
import { 
  Sun, Globe, CaretDown, ArrowsClockwise, XCircle, 
  Crown, CalendarBlank, GlobeHemisphereWest, CreditCard, 
  Phone, CalendarX, Users, DeviceMobile, ClockCounterClockwise, 
  Gear, LockKey, SignOut, Desktop, Television, LockKeyOpen
} from '@phosphor-icons/react';

export default function NetflixToolsPage() {
  const [accessCode, setAccessCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/netflix`;
  const [authData, setAuthData] = useState({ authURL: '', buildId: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      const res = await fetch(`${API_BASE}/account_info?access_code=${encodeURIComponent(inputCode)}`);
      const data = await res.json();
      
      if (data.success) {
        setAccessCode(inputCode);
        setAccountInfo(data);
        if (data.authURL) setAuthData(prev => ({ ...prev, authURL: data.authURL }));
        setIsValidated(true);
        setLoading(false);
        loadDevices(inputCode);
      } else {
        setLoginError(data.error || 'Kode Akses tidak valid atau cookie Netflix tidak ditemukan.');
      }
    } catch (err) {
      setLoginError('Error koneksi ke server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loadData = () => {
    loadAccountInfo(accessCode);
    loadDevices(accessCode);
  };

  const loadAccountInfo = async (code: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/account_info?access_code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.success) {
        setAccountInfo(data);
        if (data.authURL) setAuthData(prev => ({ ...prev, authURL: data.authURL }));
      }
    } catch (err) {
      console.error('Error fetching account info:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDevices = async (code: string) => {
    setLoadingDevices(true);
    try {
      const res = await fetch(`${API_BASE}/devices?access_code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.success) {
        setDevices(data.devices || []);
        setAuthData(prev => ({ 
          authURL: data.authURL || prev.authURL, 
          buildId: data.build_id || prev.buildId 
        }));
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleLogoutDevice = async (deviceId: string) => {
    if (!confirm('Yakin ingin melogout device ini?')) return;
    try {
      const res = await fetch(`${API_BASE}/logout_device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_code: accessCode, deviceId, ...authData })
      });
      const data = await res.json();
      if (data.success) {
        alert('Device berhasil dilogout!');
        loadDevices(accessCode);
      } else {
        alert(`Gagal logout: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error sistem saat logout device');
    }
  };

  const handleLogoutAll = async () => {
    if (!confirm('Yakin ingin melogout SEMUA device?')) return;
    setIsLoggingOutAll(true);
    try {
      const res = await fetch(`${API_BASE}/logout_all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_code: accessCode, ...authData })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Berhasil melogout ${data.count} device!`);
        loadDevices(accessCode);
      } else {
        alert(`Gagal logout all: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error sistem saat logout all devices');
    } finally {
      setIsLoggingOutAll(false);
    }
  };

  const handleDisconnect = () => {
    setIsValidated(false);
    setAccessCode('');
    setInputCode('');
    setAccountInfo(null);
    setDevices([]);
  };

  if (!isValidated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: '#0a0a0a', backgroundImage: 'none', position: 'absolute', inset: 0, zIndex: 9999 }}
      >
        <div className="bg-[#141414] border border-[#2a2a2a] p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6 text-[#ef4444]">
            <LockKeyOpen size={48} weight="duotone" />
          </div>
          <h1 className="text-2xl font-bold text-center text-[#f5f5f5] mb-2">Netflix Tools</h1>
          <p className="text-[#a3a3a3] text-center text-sm mb-8">
            Masukkan Kode Akses Anda untuk mengelola perangkat dan profil Netflix.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Kode Akses</label>
              <input 
                type="text" 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Misal: LUNEXA-XXXX"
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-[#f5f5f5] outline-none focus:border-[#ef4444] transition-colors"
                required
              />
            </div>
            {loginError && <div className="text-[#ef4444] text-sm bg-[#ef4444]/10 p-3 rounded-lg border border-[#ef4444]/20">{loginError}</div>}
            
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoggingIn ? 'Mengecek...' : 'Check Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-sans p-6 selection:bg-[#ef4444] selection:text-white pb-20"
      style={{ backgroundColor: '#0a0a0a', backgroundImage: 'none', position: 'absolute', inset: 0, zIndex: 9999, overflowY: 'auto' }}
    >
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center text-[#f5f5f5]">
          <div className="text-sm text-[#a3a3a3] flex items-center gap-2">
            Application <span className="mx-1">/</span> <span className="text-[#f5f5f5] font-medium">Netflix Tools</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414] rounded-full transition-all">
              <Sun size={20} weight="bold" />
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#2a2a2a] rounded-full text-[13px] cursor-pointer hover:bg-[#1a1a1a] transition-all">
              <Globe size={16} /> English <CaretDown size={14} />
            </div>
            <div className="px-4 py-1.5 bg-[#10b981]/10 text-[#10b981] font-semibold text-[13px] rounded-full flex items-center gap-2">
              <LockKey size={14} /> {accessCode}
            </div>
          </div>
        </header>

        {/* Connection Status */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 md:p-6 shadow-sm text-[#f5f5f5]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#10b981] rounded-full shadow-[0_0_10px_#10b981]"></div>
              <div className="text-lg font-semibold flex items-baseline gap-2">
                Netflix Terhubung
                <span className="text-sm font-normal text-[#a3a3a3]">
                  • {loading ? 'Loading profil...' : `${accountInfo?.profiles?.length || 0} profil`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={loadData} className="p-2 text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-full transition-all">
                <ArrowsClockwise size={20} weight="bold" />
              </button>
              <button onClick={handleDisconnect} className="flex items-center gap-1.5 text-[#ef4444] font-medium text-sm hover:text-[#dc2626] transition-colors">
                <XCircle size={20} weight="fill" /> Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* Account Info Grid */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5 md:p-6 text-[#f5f5f5]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#a3a3a3]">
                <Crown size={16} className="text-yellow-500" /> Plan
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-16"></div> : <div className="font-medium text-[15px]">{accountInfo?.plan || '-'}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#a3a3a3]">
                <CalendarBlank size={16} /> Member Since
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-20"></div> : <div className="font-medium text-[15px]">{accountInfo?.memberSince || '-'}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#a3a3a3]">
                <GlobeHemisphereWest size={16} /> Country
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-10"></div> : <div className="font-medium text-[15px]">{accountInfo?.country || '-'}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#a3a3a3]">
                <CreditCard size={16} /> Payment
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-12"></div> : <div className="font-medium text-[15px]">{accountInfo?.payment || '-'}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#a3a3a3]">
                <Phone size={16} /> Phone
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-24"></div> : <div className="font-medium text-[15px]">{accountInfo?.phone || '-'}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#ef4444]">
                <CalendarX size={16} /> Berakhir
              </div>
              {loading ? <div className="h-5 bg-[#2a2a2a] animate-pulse rounded w-20"></div> : <div className="font-medium text-[15px] text-[#ef4444]">{accountInfo?.expiry || '-'}</div>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto bg-[#141414] p-2 rounded-2xl border border-[#2a2a2a] scrollbar-hide text-[#f5f5f5]">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#a3a3a3] hover:text-[#f5f5f5] rounded-xl transition-all whitespace-nowrap">
            <Users size={18} /> Profiles
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#f5f5f5] bg-[#1e1e1e] border border-[#333] rounded-xl shadow-sm whitespace-nowrap">
            <DeviceMobile size={18} /> Devices
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#a3a3a3] hover:text-[#f5f5f5] rounded-xl transition-all whitespace-nowrap">
            <ClockCounterClockwise size={18} /> History
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#a3a3a3] hover:text-[#f5f5f5] rounded-xl transition-all whitespace-nowrap">
            <Gear size={18} /> Settings
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#a3a3a3] hover:text-[#f5f5f5] rounded-xl transition-all whitespace-nowrap">
            <LockKey size={18} /> Akun
          </button>
        </div>

        {/* Devices Section */}
        <div className="space-y-4 pt-2 text-[#f5f5f5]">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-base font-semibold">{devices.length} Device Terhubung</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => loadDevices(accessCode)} className="p-2 text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] rounded-full transition-all">
                <ArrowsClockwise size={20} className={loadingDevices ? "animate-spin" : ""} />
              </button>
              <button 
                onClick={handleLogoutAll} 
                disabled={isLoggingOutAll}
                className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                <SignOut size={18} weight="bold" />
                {isLoggingOutAll ? 'Loading...' : 'Logout All'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {loadingDevices ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#2a2a2a] rounded w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-[#2a2a2a] rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : devices.length === 0 ? (
              <div className="text-center py-10 text-[#a3a3a3] bg-[#141414] rounded-xl border border-[#2a2a2a]">
                Tidak ada device terhubung
              </div>
            ) : (
              devices.map((device, idx) => {
                const typeLow = device.type.toLowerCase();
                const isMobile = typeLow.includes('phone') || typeLow.includes('mobile') || typeLow.includes('ios') || typeLow.includes('android');
                const isTV = typeLow.includes('tv') || typeLow.includes('smart');
                
                return (
                  <div key={idx} className="group bg-[#141414] border border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#333] rounded-xl p-4 flex items-center justify-between transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl border border-[#2a2a2a] bg-[#111] flex items-center justify-center
                        ${isMobile ? 'text-blue-500' : isTV ? 'text-purple-500' : 'text-emerald-500'}`}>
                        {isMobile ? <DeviceMobile size={24} /> : isTV ? <Television size={24} /> : <Desktop size={24} />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-[15px] font-semibold flex items-center gap-2">
                          {device.name}
                          {device.isCurrent && (
                            <span className="text-[11px] px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded-md font-medium">This device</span>
                          )}
                        </div>
                        <div className="text-[13px] text-[#a3a3a3]">
                          {device.type} • {device.last_active} {device.profile && `• Profile: ${device.profile}`}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleLogoutDevice(device.id)}
                      className="p-2 text-[#a3a3a3] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <SignOut size={20} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
