/* ==========================================================================
   FitLife Fitness Club - External JavaScript File
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // 1. WELCOME MESSAGE 
    //  Home page (index.html)
    // Prompts user for name and displays a custom banner at the top.
    // ==========================================================================
    const isHomePage = 
        window.location.pathname.endsWith("index.html") || 
        window.location.pathname.endsWith("/") || 
        window.location.pathname === "";

    if (isHomePage) {
        const userName = prompt("Welcome to FitLife Fitness Club! What is your name?");

        const welcomeBanner = document.createElement("div");
        welcomeBanner.id = "welcome-banner";
        welcomeBanner.style.backgroundColor = "#111111";
        welcomeBanner.style.color = "#ffffff";
        welcomeBanner.style.padding = "15px 20px";
        welcomeBanner.style.marginBottom = "25px";
        welcomeBanner.style.borderRadius = "8px";
        welcomeBanner.style.borderLeft = "5px solid #ff4747";
        welcomeBanner.style.fontFamily = "'Montserrat', sans-serif";
        welcomeBanner.style.fontWeight = "600";
        welcomeBanner.style.textAlign = "center";
        welcomeBanner.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)";

        if (userName && userName.trim() !== "") {
            welcomeBanner.innerHTML = `Welcome to FitLife Fitness Club, <span style="color: #ff4747;">${userName.trim()}</span>! Ready to reach your goals?`;
        } else {
            welcomeBanner.innerHTML = `Welcome to <span style="color: #ff4747;">FitLife Fitness Club</span>! Ready to start your fitness journey?`;
        }

        const mainContainer = document.querySelector(".container") || document.querySelector("main") || document.body;
        mainContainer.insertBefore(welcomeBanner, mainContainer.firstChild);
    }

    // ==========================================================================
    // 2. FORM VALIDATION & CONFIRMATION 
    //  Forms on contact.html & membership.html
    // Validates that required fields are filled out before submitting.
    // ==========================================================================
    const forms = document.querySelectorAll(".contact-form");

    forms.forEach((form) => {
        const feedbackMessage = document.createElement("p");
        feedbackMessage.className = "form-feedback";
        feedbackMessage.style.marginTop = "15px";
        feedbackMessage.style.fontWeight = "600";
        feedbackMessage.style.fontFamily = "'Open Sans', sans-serif";
        feedbackMessage.style.fontSize = "15px";

        const submitBtn = form.querySelector(".btn-submit");
        if (submitBtn) {
            form.insertBefore(feedbackMessage, submitBtn);
        } else {
            form.appendChild(feedbackMessage);
        }

        form.addEventListener("submit", (event) => {
            const requiredFields = form.querySelectorAll("[required]");
            let missingFields = [];

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    const formGroup = field.closest(".form-group");
                    let fieldName = "Required Field";
                    
                    if (formGroup && formGroup.querySelector("label")) {
                        fieldName = formGroup.querySelector("label").textContent.replace(":", "").trim();
                    } else if (field.id) {
                        fieldName = field.id;
                    }
                    
                    missingFields.push(fieldName);
                }
            });

            if (missingFields.length > 0) {
                event.preventDefault(); // Stop submission if fields are blank
                feedbackMessage.textContent = `⚠️ Please complete the required field(s): ${missingFields.join(", ")}.`;
                feedbackMessage.style.color = "#ff4747";
            } else {
                event.preventDefault(); // Prevent reload for demo submission
                
                const nameInput = form.querySelector("input[type='text']");
                const userName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Member";

                feedbackMessage.textContent = `✅ Thank you, ${userName}! Your submission was received successfully.`;
                feedbackMessage.style.color = "#2e7d32";
                form.reset();
            }
        });
    });

    // ==========================================================================
    // 3. DYNAMIC CONTENT FEATURES 
    // ==========================================================================

    // Feature A: Home Page Highlights Interactivity (index.html)
    const homeCards = document.querySelectorAll(".home-highlights > div");
    
    if (homeCards.length > 0) {
        homeCards.forEach((card) => {
            card.style.cursor = "pointer";
            card.style.transition = "all 0.3s ease";

            card.addEventListener("click", () => {
                const isSelected = card.style.borderColor === "rgb(255, 71, 71)";

                // Reset cards
                homeCards.forEach(c => {
                    c.style.borderColor = "transparent";
                    c.style.transform = "translateY(0)";
                    c.style.boxShadow = "none";
                });

                // Highlight selected card
                if (!isSelected) {
                    card.style.border = "2px solid #ff4747";
                    card.style.borderRadius = "8px";
                    card.style.transform = "translateY(-4px)";
                    card.style.boxShadow = "0 8px 15px rgba(255, 71, 71, 0.12)";
                }
            });
        });
    }

    // Feature B: Interactive Trainer Cards (trainers.html)
    const trainerCards = document.querySelectorAll(".trainer-profile-card");
    
    if (trainerCards.length > 0) {
        trainerCards.forEach((card) => {
            card.style.cursor = "pointer";
            card.style.transition = "all 0.3s ease";

            card.addEventListener("click", () => {
                const isSelected = card.style.borderColor === "rgb(255, 71, 71)";

                trainerCards.forEach(c => {
                    c.style.borderColor = "#e0e0e0";
                    c.style.backgroundColor = "#ffffff";
                    c.style.transform = "translateY(0)";
                    c.style.boxShadow = "none";
                });

                if (!isSelected) {
                    card.style.border = "2px solid #ff4747";
                    card.style.backgroundColor = "#fff5f5";
                    card.style.transform = "translateY(-5px)";
                    card.style.boxShadow = "0 8px 15px rgba(255, 71, 71, 0.15)";
                }
            });
        });
    }

    // Feature C: Interactive Table Rows (programs.html & trainers.html)
    const tableRows = document.querySelectorAll(".hours-table tbody tr");
    
    if (tableRows.length > 0) {
        tableRows.forEach((row) => {
            row.style.cursor = "pointer";
            row.style.transition = "background-color 0.2s ease";

            row.addEventListener("click", () => {
                const isSelected = row.style.backgroundColor === "rgb(255, 235, 235)";

                const siblingRows = row.closest("tbody").querySelectorAll("tr");
                siblingRows.forEach(r => {
                    r.style.backgroundColor = "";
                    r.style.fontWeight = "normal";
                });

                if (!isSelected) {
                    row.style.backgroundColor = "#ffebeb";
                    row.style.fontWeight = "600";
                }
            });
        });
    }

    // Feature D: Interactive Contact Info Cards (contact.html)
    const infoCards = document.querySelectorAll(".info-cards .card");
    
    infoCards.forEach((card) => {
        card.style.cursor = "pointer";
        card.style.transition = "all 0.3s ease";

        card.addEventListener("click", () => {
            const isAlreadyActive = card.style.backgroundColor === "rgb(255, 235, 235)";

            infoCards.forEach((c) => {
                c.style.backgroundColor = "#f4f4f4";
                c.style.borderLeftColor = "#ff4747";
                c.style.transform = "translateY(0)";
            });

            if (!isAlreadyActive) {
                card.style.backgroundColor = "#ffebeb";
                card.style.borderLeftColor = "#1a1a1a";
                card.style.transform = "translateY(-4px)";
            }
        });
    });

    // Feature E: Show/Hide Toggle Section (gallery.html)
    const gallerySection = document.querySelector(".gallery-intro");

    if (gallerySection) {
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Show Facility Tips";
        toggleBtn.className = "btn-submit";
        toggleBtn.style.marginBottom = "20px";
        toggleBtn.style.fontSize = "12px";
        toggleBtn.style.padding = "10px 18px";

        const tipContainer = document.createElement("div");
        tipContainer.style.display = "none";
        tipContainer.style.background = "#f4f4f4";
        tipContainer.style.borderLeft = "5px solid #ff4747";
        tipContainer.style.padding = "15px 20px";
        tipContainer.style.marginBottom = "25px";
        tipContainer.style.borderRadius = "0 8px 8px 0";
        tipContainer.innerHTML = `
            <p style="margin: 0; font-size: 14px; color: #444;">
                <strong>💡 Quick Tip:</strong> Peak facility hours are 5:00 PM – 8:00 PM on weekdays. For full equipment availability, try scheduling workouts between 10:00 AM – 3:00 PM!
            </p>
        `;

        const galleryGrid = document.querySelector(".gallery-grid");
        if (galleryGrid) {
            gallerySection.insertBefore(toggleBtn, galleryGrid);
            gallerySection.insertBefore(tipContainer, galleryGrid);
        }

        toggleBtn.addEventListener("click", () => {
            if (tipContainer.style.display === "none") {
                tipContainer.style.display = "block";
                toggleBtn.textContent = "Hide Facility Tips";
            } else {
                tipContainer.style.display = "none";
                toggleBtn.textContent = "Show Facility Tips";
            }
        });
    }

});