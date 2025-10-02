import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

const Store: React.FC = () => {
  const { user, storeItems, purchaseItem } = useApp();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadStoreItems();
  }, []);

  const loadStoreItems = async () => {
    try {
      setLoading(true);
      const response = await apiService.getStoreItems();
      if (response.success) {
        // storeItems уже загружены через контекст
      }
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (itemId: number) => {
    if (!user) return;
    
    try {
      await purchaseItem(itemId);
      alert('Покупка успешна!');
    } catch (error) {
      alert('Ошибка покупки: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  const filteredItems = storeItems.filter(item => 
    filter === 'all' || item.category === filter
  );

  const categories = ['all', ...Array.from(new Set(storeItems.map(item => item.category)))];

  if (loading) {
    return <div>Загрузка магазина...</div>;
  }

  return (
    <div className="store">
      <div className="store-header">
        <h2>Магазин</h2>
        <div className="user-mana">
          <span>Ваша мана: {user?.mana || 0}</span>
        </div>
      </div>

      <div className="store-filters">
        {categories.map(category => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'Все товары' : category}
          </button>
        ))}
      </div>

      <div className="store-items">
        {filteredItems.map((item) => (
          <div key={item.id} className="store-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-category">{item.category}</div>
            </div>
            
            <div className="item-price">
              <span className="price-value">{item.price}</span>
              <span className="price-currency">мана</span>
            </div>
            
            <div className="item-actions">
              <button
                className="btn-purchase"
                onClick={() => handlePurchase(item.id)}
                disabled={!user || user.mana < item.price}
              >
                {!user ? 'Войдите в систему' : 
                 user.mana < item.price ? 'Недостаточно маны' : 
                 'Купить'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
