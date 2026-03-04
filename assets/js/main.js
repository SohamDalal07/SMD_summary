/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

//Menu Show
/* validate if content exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
    const navMenu = document.getElementById("nav-menu")
    navMenu.classList.remove("show-menu")
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById("header")
    //when the scroll is greater than 50 viewport height add this
    this.scrollY >= 50 ? header.classList.add("shadow-header") : header.classList.remove("shadow-header")
}
window.addEventListener("scroll", shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form")
contactMessage = document.getElementById("contact-message")

const sendEmail = (e) => {
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_agjzg9g', 'template_ozrhde7', '#contact-form', 'KG8w3aez8PwBvFfFc')
        .then(() => {
            //Show sent message
            contactMessage.textContent = "Thank you! Your message has been sent successfully. I’ll be in touch soon—excited to connect and explore new ideas together! Sent "

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ""
            }, 5000)

            //clear input field
            contactForm.reset()
        }), () => {
            //Show error message
            contactMessage.textContent = "Message not sent (service error) ❌"
        }
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up")
    // when the scroll is higher than 350 viewport height, add the show-scroll to the a tagh with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add("show-scroll")
        : scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {

    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 40,
    reset: true// animation repeat
})

sr.reveal('.home__perfil, .about__image, .contact__mail', { origin: 'right' })
sr.reveal('.home__name, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data', { origin: 'left' })
sr.reveal('.services__card, .projects__card, .events__card', { interval: 100 })

/*=============== CHATBOT LOGIC ===============*/
const chatbot = document.getElementById('chatbot'),
    chatbotToggle = document.getElementById('chatbot-toggle'),
    chatbotWindow = document.getElementById('chatbot-window'),
    chatbotClose = document.getElementById('chatbot-close'),
    chatbotForm = document.getElementById('chatbot-form'),
    chatbotInput = document.getElementById('chatbot-input'),
    chatbotMessages = document.getElementById('chatbot-messages')

/* Open/Close Chatbot */
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('show-chatbot')
        if (chatbot.classList.contains('show-chatbot')) {
            chatbotInput.focus()
        }
    })
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbot.classList.remove('show-chatbot')
    })
}

/* Handle Message Submission */
if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const message = chatbotInput.value.trim()
        if (message) {
            // Add user message
            addMessage(message, 'user')
            chatbotInput.value = ''

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message)
                addMessage(botResponse, 'bot')
            }, 800)
        }
    })
}

/* Function to Add Message to UI */
function addMessage(text, side) {
    const messageDiv = document.createElement('div')
    messageDiv.classList.add('chatbot__message', side)

    messageDiv.innerHTML = `<p>${text}</p>`
    chatbotMessages.appendChild(messageDiv)

    // Auto scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

/* Simple Bot Responses */
function getBotResponse(input) {
    const text = input.toLowerCase()

    if (text.includes('hello') || text.includes('hi')) return "Hi there! I'm here to help you explore Soham's work. What would you like to know?"
    if (text.includes('project') || text.includes('work')) return "Soham has worked on several AI and ML projects, including an Insurance Assistant (RAG Pipeline) and a Crop Disease Detection system. Check out the 'Builds & Projects' section for more details!"
    if (text.includes('contact') || text.includes('email')) return "You can reach Soham via the contact form on this page or email him at sd6254@srmist.edu.in"
    if (text.includes('skill')) return "Soham is proficient in Core Languages (Java, Python, C++), AI/ML algorithms, BI Tools (Power BI, Tableau), Backend (Spring Boot, FastAPI), and Frontend (React)."
    if (text.includes('about')) return "Soham is an IT student passionate about Intelligent Systems, Machine Learning, and finding data-driven solutions to complex problems."
    if (text.includes('experience') || text.includes('internship')) return "Soham recently completed an internship at CSRBOX as a Research Consultant, working on WaSH and PBL projects."
    if (text.includes('event')) return "Soham has participated in events like the Global Expo-2024 at MPSTME and the Tech Fiesta-2025 Hackathon at NMIMS Hyderabad."

    return "That's interesting! Feel free to explore the different sections of the portfolio to learn more about my journey."
}
