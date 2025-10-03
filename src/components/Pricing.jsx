import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate()

  const pricingPlans = [
    {
      id: 'cuppa',
      name: '« Cuppa »',
      icon: '/assets/cuppa-icon.png',
      price: '0€',
      period: '/mois',
      description: 'Parfait pour commencer',
      features: [
        '2 heures d\'accès gratuit par mois',
        'Toutes les ressources disponibles',
        'Progression sauvegardée',
        'Support communautaire'
      ],
      buttonText: 'Commencer gratuitement',
      buttonStyle: 'secondary',
      popular: false
    },
    {
      id: 'sarnie',
      name: '« Sarnie »',
      icon: '/assets/sarnie-icon.png',
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
      buttonText: 'Choisir Sarnie',
      buttonStyle: 'primary',
      popular: true
    },
    {
      id: 'full-english',
      name: '« Full English »',
      icon: '/assets/full-english-icon.png',
      price: '50€',
      period: '/mois',
      description: 'Tout Sarnie + cours en direct',
      features: [
        'Tout ce qui est inclus dans Sarnie',
        '2 cours de conversation de 30 min/mois',
        'Corrections personnalisées',
        '2 retours d\'écriture/mois',
        'Tuteur dédié',
        'Plan d\'apprentissage personnalisé'
      ],
      buttonText: 'Choisir Full English',
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
                  {plan.popular && <div className="popular-badge">Le plus populaire</div>}
                  
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
              <p>Tous les plans incluent un essai gratuit de 7 jours</p>
              <p>Annulation possible à tout moment</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Pricing

