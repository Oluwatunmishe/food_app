import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { Search, Clock, Users, Heart, ChefHat, Star } from 'lucide-react';

const RecipeApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Recipes', icon: ChefHat },
    { id: 'breakfast', name: 'Breakfast', icon: '🥐' },
    { id: 'lunch', name: 'Lunch', icon: '🥗' },
    { id: 'dinner', name: 'Dinner', icon: '🍽️' },
    { id: 'dessert', name: 'Dessert', icon: '🍰' },
  ];

  const recipes = [
    {
      id: 1,
      title: 'Mediterranean Salmon Bowl',
      category: 'lunch',
      time: 25,
      servings: 2,
      difficulty: 'Easy',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      description: 'Fresh salmon with quinoa, vegetables, and tahini dressing',
      tags: ['Healthy', 'High Protein', 'Gluten-Free']
    },
    {
      id: 2,
      title: 'Truffle Mushroom Risotto',
      category: 'dinner',
      time: 45,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      description: 'Creamy arborio rice with wild mushrooms and truffle oil',
      tags: ['Vegetarian', 'Comfort Food', 'Italian']
    },
    {
      id: 3,
      title: 'Chocolate Lava Cake',
      category: 'dessert',
      time: 20,
      servings: 2,
      difficulty: 'Easy',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      description: 'Decadent molten chocolate cake with vanilla ice cream',
      tags: ['Dessert', 'Chocolate', 'Quick']
    },
    {
      id: 4,
      title: 'Avocado Toast Deluxe',
      category: 'breakfast',
      time: 10,
      servings: 1,
      difficulty: 'Easy',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
      description: 'Sourdough toast with smashed avocado, poached egg, and microgreens',
      tags: ['Healthy', 'Vegetarian', 'Quick']
    },
    {
      id: 5,
      title: 'Thai Green Curry',
      category: 'dinner',
      time: 35,
      servings: 3,
      difficulty: 'Medium',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
      description: 'Aromatic coconut curry with vegetables and jasmine rice',
      tags: ['Spicy', 'Asian', 'Coconut']
    },
    {
      id: 6,
      title: 'Berry Parfait',
      category: 'breakfast',
      time: 5,
      servings: 1,
      difficulty: 'Easy',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      description: 'Layered yogurt with fresh berries and granola',
      tags: ['Healthy', 'No Cook', 'Protein']
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (recipeId) => {
    setFavoriteRecipes(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return { color: '#16a34a', backgroundColor: '#dcfce7' };
      case 'Medium': return { color: '#ca8a04', backgroundColor: '#fef3c7' };
      case 'Hard': return { color: '#dc2626', backgroundColor: '#fee2e2' };
      default: return { color: '#6b7280', backgroundColor: '#f3f4f6' };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 50%, #faf5ff 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #f97316, #ec4899)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChefHat size={24} color="white" />
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ea580c, #db2777)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              FlavorCraft
            </h1>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                width: '320px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '9999px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.5)';
                e.target.style.borderColor = 'transparent';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Discover Amazing{' '}
            <span style={{
              background: 'linear-gradient(45deg, #f97316, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Recipes
            </span>
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            From quick breakfast ideas to gourmet dinners, find your next favorite dish
          </p>
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  transition: 'all 0.3s',
                  transform: 'scale(1)',
                  background: isSelected 
                    ? 'linear-gradient(45deg, #f97316, #ec4899)'
                    : 'rgba(255, 255, 255, 0.7)',
                  color: isSelected ? 'white' : '#374151',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(4px)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  if (!isSelected) e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  if (!isSelected) e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                {typeof category.icon === 'string' ? (
                  <span style={{ fontSize: '1.125rem' }}>{category.icon}</span>
                ) : (
                  <IconComponent size={20} />
                )}
                <span style={{ fontWeight: '500' }}>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Recipe Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(4px)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.5s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '50%',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.2s',
                      background: favoriteRecipes.has(recipe.id)
                        ? '#ef4444'
                        : 'rgba(255, 255, 255, 0.7)',
                      color: favoriteRecipes.has(recipe.id) ? 'white' : '#6b7280',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart
                      size={20}
                      fill={favoriteRecipes.has(recipe.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    ...getDifficultyStyle(recipe.difficulty)
                  }}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '8px',
                  transition: 'color 0.2s'
                }}>
                  {recipe.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '16px',
                  lineHeight: '1.4'
                }}>
                  {recipe.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 12px',
                        background: 'linear-gradient(45deg, #fed7aa, #fce7f3)',
                        color: '#ea580c',
                        fontSize: '0.75rem',
                        borderRadius: '9999px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={16} />
                      <span>{recipe.time}m</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={16} />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontWeight: '500' }}>{recipe.rating}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #f97316, #ec4899)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ea580c, #db2777)';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #f97316, #ec4899)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}>
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{
              width: '96px',
              height: '96px',
              background: 'linear-gradient(45deg, #fed7aa, #fce7f3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Search size={48} color="#f97316" />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px'
            }}>
              No recipes found
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px'
            }}>
              Try adjusting your search or browse different categories
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              style={{
                background: 'linear-gradient(45deg, #f97316, #ec4899)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Show All Recipes
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(4px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(45deg, #f97316, #ec4899)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChefHat size={20} color="white" />
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ea580c, #db2777)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              FlavorCraft
            </span>
          </div>
          <p style={{ color: '#6b7280' }}>
            Crafting culinary experiences, one recipe at a time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeApp;