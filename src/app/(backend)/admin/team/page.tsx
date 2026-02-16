// app/(backend)/admin/team/page.tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/app/ThemeProvider";
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  SearchIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  MoreVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@/assets/icons";
import TeamMemberModal from "./components/TeamMemberModal";
import { mockTeamMembers } from "./data";

export default function TeamPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Handle CRUD operations
  const handleAddMember = (member: any) => {
    setTeamMembers(prev => [{
      ...member,
      id: Date.now().toString(),
      order: prev.length
    }, ...prev]);
    setShowModal(false);
  };

  const handleEditMember = (member: any) => {
    setTeamMembers(prev => prev.map(m => 
      m.id === member.id ? member : m
    ));
    setShowModal(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setTeamMembers(prev => prev.map(m => 
      m.id === id ? { ...m, active: !m.active } : m
    ));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newMembers = [...teamMembers];
    [newMembers[index - 1], newMembers[index]] = [newMembers[index], newMembers[index - 1]];
    setTeamMembers(newMembers);
  };

  const handleMoveDown = (index: number) => {
    if (index === teamMembers.length - 1) return;
    const newMembers = [...teamMembers];
    [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
    setTeamMembers(newMembers);
  };

  // Get unique departments for filter
  const departments = Array.from(new Set(teamMembers.map(m => m.department)));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-bold transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Team Management
          </h1>
          <p className={`mt-1 transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Manage your leadership team and their information
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMember(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
        >
          <PlusIcon size={16} />
          Add Team Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`rounded-xl p-6 transition-all duration-500 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <UsersIcon size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{teamMembers.length}</p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Total Members
          </p>
        </div>

        <div className={`rounded-xl p-6 transition-all duration-500 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <UsersIcon size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{teamMembers.filter(m => m.active).length}</p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Active Members
          </p>
        </div>

        <div className={`rounded-xl p-6 transition-all duration-500 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <UsersIcon size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{departments.length}</p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Departments
          </p>
        </div>

        <div className={`rounded-xl p-6 transition-all duration-500 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <UsersIcon size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">
            {teamMembers.reduce((sum, m) => sum + m.experience, 0)}
          </p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Combined Years Experience
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl p-6 mb-6 transition-all duration-500 ${
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
            </div>
            <input
              type="search"
              placeholder="Search by name, role, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group ${
              isDarkMode 
                ? "bg-gray-800 border border-gray-700 hover:border-gray-600" 
                : "bg-white border border-gray-200 hover:border-gray-300"
            } ${!member.active && 'opacity-75'}`}
          >
            {/* Status Badge */}
            {!member.active && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2 py-1 text-xs bg-gray-500 text-white rounded-full">
                  Inactive
                </span>
              </div>
            )}

            {/* Order Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-1">
              {index > 0 && (
                <button
                  onClick={() => handleMoveUp(index)}
                  className="p-1.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Move Up"
                >
                  <ArrowUpIcon size={14} />
                </button>
              )}
              {index < teamMembers.length - 1 && (
                <button
                  onClick={() => handleMoveDown(index)}
                  className="p-1.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Move Down"
                >
                  <ArrowDownIcon size={14} />
                </button>
              )}
            </div>

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <div
                className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className={`absolute inset-0 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gradient-to-t from-black/70 to-transparent" 
                  : "bg-gradient-to-t from-black/60 to-transparent"
              }`} />
              
              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => handleToggleActive(member.id)}
                  className={`p-2 backdrop-blur-sm rounded-lg transition-colors ${
                    member.active
                      ? isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-500/20 text-green-600"
                      : isDarkMode ? "bg-gray-700/80 text-gray-400" : "bg-gray-200/80 text-gray-600"
                  }`}
                  title={member.active ? "Deactivate" : "Activate"}
                >
                  {member.active ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                </button>
                <button
                  onClick={() => {
                    setEditingMember(member);
                    setShowModal(true);
                  }}
                  className="p-2 backdrop-blur-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  title="Edit"
                >
                  <EditIcon size={16} />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-2 backdrop-blur-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>{member.name}</h3>
                  <p className="text-amber-500 font-semibold text-sm">{member.role}</p>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}>{member.department}</p>
                </div>
              </div>
              
              <p className={`text-sm mb-4 line-clamp-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>{member.bio}</p>
              
              {/* Experience */}
              <div className="mb-4">
                <div className={`text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {member.experience}+ Years Experience
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isDarkMode 
                          ? "bg-amber-900/30 text-amber-300" 
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {member.email && (
                  <div className={`flex items-center gap-2 text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <MailIcon size={12} />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className={`flex items-center gap-2 text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <PhoneIcon size={12} />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "hover:bg-gray-700 text-gray-400" 
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "hover:bg-gray-700 text-gray-400" 
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <TwitterIcon size={16} />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "hover:bg-gray-700 text-gray-400" 
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {member.social.facebook && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "hover:bg-gray-700 text-gray-400" 
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
              </div>

              {/* Contact Button */}
              <button className={`mt-4 w-full border py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                isDarkMode 
                  ? "border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400" 
                  : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
              }`}>
                Contact {member.name.split(' ')[0]}
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className={`col-span-full text-center py-12 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            No team members found
          </div>
        )}
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingMember(null);
        }}
        member={editingMember}
        isDarkMode={isDarkMode}
        onSubmit={(data) => {
          if (editingMember) {
            handleEditMember(data);
          } else {
            handleAddMember(data);
          }
        }}
      />
    </div>
  );
}