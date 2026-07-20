import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Admin Auth State
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [adminUser, setAdminUser] = useState(JSON.parse(localStorage.getItem('adminUser') || 'null'));

  // Global Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryPropertyContext, setEnquiryPropertyContext] = useState(null);

  // Global Toast / Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Verify Admin Token on mount
  useEffect(() => {
    if (adminToken) {
      API.get('/auth/profile')
        .then(res => {
          if (res.data.success) {
            setAdminUser(res.data.admin);
          }
        })
        .catch(() => {
          logoutAdmin();
        });
    }
  }, [adminToken]);

  const loginAdmin = (token, user) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    setAdminToken(token);
    setAdminUser(user);
    showToast('Admin logged in successfully!');
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminToken(null);
    setAdminUser(null);
    showToast('Admin logged out.');
  };

  const openEnquiryModal = (propertyObj = null) => {
    setEnquiryPropertyContext(propertyObj);
    setEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalOpen(false);
    setEnquiryPropertyContext(null);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppContext.Provider value={{
      adminToken,
      adminUser,
      loginAdmin,
      logoutAdmin,
      enquiryModalOpen,
      enquiryPropertyContext,
      openEnquiryModal,
      closeEnquiryModal,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
