import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setItems, purchaseItem } from '../store/slices/storeSlice';
import { updateUserMana } from '../store/thunks/userThunks';
// Removed mock data import

const StorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => (state.store as any).items) || [];
  const purchasedItems = useAppSelector((state) => (state.store as any).purchasedItems) || [];
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Загружаем товары из API
    // dispatch(setItems(storeItems));
  }, [dispatch]);

  const handlePurchase = async (itemId: number) => {
    if (!user) return;
    
    const item = items.find((i: any) => i.id === itemId);
    if (!item) return;
    
    if (user.mana >= item.price) {
      try {
        dispatch(purchaseItem(itemId));
        dispatch(updateUserMana({ userId: user.id, amount: -item.price }));
        alert('Покупка успешна!');
      } catch (error) {
        alert('Ошибка покупки');
      }
    } else {
      alert('Недостаточно маны!');
    }
  };

  const categories = ['all', ...Array.from(new Set(items.map((item: any) => item.category)))];
  const filteredItems = items.filter((item: any) => 
    filter === 'all' || item.category === filter
  );

  return (
    <div className="store-page">
      <div className="store-header">
        <h2>Магазин</h2>
        <div className="user-mana">
          <span>Ваша мана: {user?.mana || 0}</span>
        </div>
      </div>

      <div className="store-filters">
        {categories.map((category: any) => (
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
        {filteredItems.map((item: any) => {
          const isPurchased = purchasedItems.includes(item.id);
          const canAfford = user ? user.mana >= item.price : false;
          
          return (
            <div key={item.id} className={`store-item ${isPurchased ? 'purchased' : ''}`}>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {isPurchased && <div className="purchased-badge">✓</div>}
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
                  disabled={!user || !canAfford || isPurchased}
                >
                  {!user ? 'Войдите в систему' : 
                   isPurchased ? 'Куплено' :
                   !canAfford ? 'Недостаточно маны' : 
                   'Купить'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorePage;
