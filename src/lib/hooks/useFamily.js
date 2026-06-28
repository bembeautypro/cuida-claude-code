import { useState, useEffect, useCallback } from 'react';
import { getFamilyMembers, inviteMember, updateMemberPermissions, removeMember } from '../db/family.js';

export function useFamily(patientId) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!patientId) { setMembers([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getFamilyMembers(patientId);
      setMembers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  async function invite(email, role) {
    const m = await inviteMember(patientId, email, role);
    setMembers(prev => [...prev, m]);
    return m;
  }

  async function updatePermissions(memberId, permissions) {
    await updateMemberPermissions(memberId, permissions);
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, permissions } : m));
  }

  async function remove(memberId) {
    await removeMember(memberId);
    setMembers(prev => prev.filter(m => m.id !== memberId));
  }

  return { members, loading, error, reload: load, invite, updatePermissions, remove };
}
