import React from 'react'
import { useNavigate } from 'react-router-dom'
import cuppaIcon from '../assets/cuppa-icon.png'
import sarnieIcon from '../assets/sarnie-icon.png'
import fullEnglishIcon from '../assets/full-english-icon.png'

const Pricing = () => {
  const navigate = useNavigate()

  const pricingPlans = [
    {
      id: 'cuppa',
      name: '«\u00A0Cuppa\u00A0»',
      icon: cuppaIcon,
      price: '0€',
      period: '/mois',
      description: 'Parfait pour commencer',
      features: [
        '2 heures d\'accès gratuit par mois',
        'Toutes les ressources disponibles',
        'Progression sauvegardée',
        'Support communautaire'
      ],
      buttonText: 'Choisir «\u00A0Cuppa\u00A0»',
      buttonStyle: 'primary',
      popular: false
    },
    {
      id: 'sarnie',
      name: '«\u00A0Sarnie\u00A0»',
      icon: sarnieIcon,
      price: '20€',
      period: '/mois',
      description: 'Accès illimité à toutes les ressources',
      features: [
        'Accès illimité à toutes les ressources',
        'Progression détaillée',
        'Support prioritaire',
        'Ressources exclusives',
        'Sauvegarde cloud'
      ],
      buttonText: 'Choisir «\u00A0Sarnie\u00A0»',
      buttonStyle: 'primary',
      popular: false
    },
    {
      id: 'full-english',
      name: '«\u00A0Full English\u00A0»',
      icon: fullEnglishIcon,
      price: '50€',
      period: '/mois',
      description: 'Accès illimité plus cours en direct',
      features: [
        'Tout ce qui est inclus dans «\u00A0Sarnie\u00A0»',
        '2 cours de conversation en ligne de 30 min/mois avec corrections personnalisées',
        '2 retours d\'écriture/mois'
      ],
      buttonText: 'Choisir «\u00A0Full English\u00A0»',
      buttonStyle: 'primary',
      popular: false
    }
  ]

  const handlePlanClick = (planId) => {
    console.log(`Plan ${planId} selected`)
    // TODO: Handle plan selection (redirect to signup with plan)
  }

  return (
    <div className="pricing-page">
      <main className="main">
        <div className="container">
          <div className="pricing-content">
            <div className="pricing-header">
              <h2>Choisissez votre plan d'apprentissage</h2>
              <p className="levels-description">Découvrez nos offres adaptées à vos besoins d'apprentissage de l'anglais</p>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                >
                  
                  <div className="plan-header">
                    <div className="plan-icon">
                      <img src={plan.icon} alt={`${plan.name} icon`} />
                    </div>
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`plan-button ${plan.buttonStyle}`}
                    onClick={() => handlePlanClick(plan.id)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            <div className="pricing-footer">
              <p>Annulation possible à tout moment</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Pricing

