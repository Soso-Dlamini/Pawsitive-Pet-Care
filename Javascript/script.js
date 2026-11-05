// =====================================
// PAWSITIVE PET ACADEMY
// Main JavaScript File
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // DISPLAY CURRENT YEAR
    // =====================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // COURSE FEE CALCULATOR
    // =====================================

    const feeCalculator = document.getElementById("fee-calculator");

    if (feeCalculator) {

        const courseCheckboxes = feeCalculator.querySelectorAll(
            'input[name="course"]'
        );

        function calculateFees() {

            let selectedCourses = [];
            let subtotal = 0;

            // Get selected courses
            courseCheckboxes.forEach(function (checkbox) {

                if (checkbox.checked) {

                    const price = Number(checkbox.value);

                    subtotal += price;

                    selectedCourses.push({
                        name: checkbox.dataset.courseName,
                        price: price,
                        duration: checkbox.dataset.duration
                    });

                }

            });

            const courseCount = selectedCourses.length;

            // Calculate discount
            let discountRate = 0;

            if (courseCount === 2) {
                discountRate = 5;
            } else if (courseCount === 3) {
                discountRate = 10;
            } else if (courseCount > 3) {
                discountRate = 15;
            }

            const discountAmount = subtotal * (discountRate / 100);

            const amountAfterDiscount = subtotal - discountAmount;

            // Calculate VAT after discount
            const vatAmount = amountAfterDiscount * 0.15;

            const total = amountAfterDiscount + vatAmount;

            // Display calculation
            document.getElementById("course-count").textContent = courseCount;

            document.getElementById("subtotal").textContent =
                "R" + subtotal.toFixed(2);

            document.getElementById("discount-rate").textContent =
                discountRate + "%";

            document.getElementById("discount-amount").textContent =
                "R" + discountAmount.toFixed(2);

            document.getElementById("after-discount").textContent =
                "R" + amountAfterDiscount.toFixed(2);

            document.getElementById("vat-amount").textContent =
                "R" + vatAmount.toFixed(2);

            document.getElementById("total").textContent =
                "R" + total.toFixed(2);

            const calculatorMessage = document.getElementById(
                "calculator-message"
            );

            if (courseCount === 0) {
                calculatorMessage.textContent =
                    "Select at least one course to calculate your fees.";
            } else {
                calculatorMessage.textContent =
                    courseCount + " course(s) selected. Your fees have been calculated.";
            }

            // Save calculation for registration
            return {
                selectedCourses: selectedCourses,
                courseCount: courseCount,
                subtotal: subtotal,
                discountRate: discountRate,
                discountAmount: discountAmount,
                amountAfterDiscount: amountAfterDiscount,
                vatAmount: vatAmount,
                total: total
            };
        }

        // Recalculate whenever a checkbox changes
        courseCheckboxes.forEach(function (checkbox) {

            checkbox.addEventListener("change", function () {
                calculateFees();
            });

        });

        // Initial calculation
        calculateFees();

    }


    // =====================================
    // REGISTRATION FORM
    // =====================================

    const registrationForm = document.getElementById("registration-form");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const studentName = document.getElementById("student-name").value.trim();

            const studentEmail = document.getElementById("student-email").value.trim();

            const studentPhone = document.getElementById("student-phone").value.trim();

            const studentCourse = document.getElementById("student-course").value;

            const studentMessage = document.getElementById("student-message").value.trim();

            const selectedLocation = document.querySelector(
                'input[name="volunteer-location"]:checked'
            );

            const registrationMessage = document.getElementById(
                "registration-message"
            );

            if (!selectedLocation) {
                registrationMessage.textContent =
                    "Please select a volunteer location.";

                return;
            }

            const volunteerLocation = selectedLocation.value;

            // Collect selected courses from calculator if available
            let courseDetails = "Course of interest: " + studentCourse;

            let feeDetails = "Fee calculation: Not available on this page.";

            const feeForm = document.getElementById("fee-calculator");

            if (feeForm) {

                const selectedCourses = feeForm.querySelectorAll(
                    'input[name="course"]:checked'
                );

                if (selectedCourses.length > 0) {

                    courseDetails = "";

                    selectedCourses.forEach(function (course) {

                        courseDetails +=
                            course.dataset.courseName +
                            " - R" +
                            Number(course.value).toFixed(2) +
                            "\n";

                    });

                    const subtotal = Array.from(selectedCourses).reduce(
                        function (sum, course) {
                            return sum + Number(course.value);
                        },
                        0
                    );

                    let discountRate = 0;

                    if (selectedCourses.length === 2) {
                        discountRate = 5;
                    } else if (selectedCourses.length === 3) {
                        discountRate = 10;
                    } else if (selectedCourses.length > 3) {
                        discountRate = 15;
                    }

                    const discountAmount = subtotal * discountRate / 100;

                    const afterDiscount = subtotal - discountAmount;

                    const vat = afterDiscount * 0.15;

                    const total = afterDiscount + vat;

                    feeDetails =
                        "Subtotal: R" + subtotal.toFixed(2) +
                        "\nDiscount: " + discountRate + "%" +
                        "\nDiscount amount: R" + discountAmount.toFixed(2) +
                        "\nAmount after discount: R" + afterDiscount.toFixed(2) +
                        "\nVAT (15%): R" + vat.toFixed(2) +
                        "\nTotal: R" + total.toFixed(2);

                }

            }

            const emailSubject = encodeURIComponent(
                "Pawsitive Pet Academy Registration Enquiry"
            );

            const emailBody = encodeURIComponent(
                "REGISTRATION ENQUIRY\n\n" +
                "Student Name: " + studentName + "\n" +
                "Email: " + studentEmail + "\n" +
                "Phone: " + studentPhone + "\n\n" +
                "Selected Courses:\n" + courseDetails + "\n" +
                feeDetails + "\n\n" +
                "Volunteer Location: " + volunteerLocation + "\n\n" +
                "Additional Information:\n" + studentMessage
            );

            registrationMessage.textContent =
                "Your email application will open with your registration details. Please review and send the email.";

            window.location.href =
                "mailto:somiladlamini740@gmail.com?subject=" +
                emailSubject +
                "&body=" +
                emailBody;

        });

    }


    // =====================================
    // CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const contactName = document.getElementById("contact-name").value.trim();

            const contactEmail = document.getElementById("contact-email").value.trim();

            const contactPhone = document.getElementById("contact-phone").value.trim();

            const contactSubject = document.getElementById("contact-subject").value;

            const contactMessage = document.getElementById("contact-message").value.trim();

            const statusMessage = document.getElementById(
                "contact-message-status"
            );

            const emailSubject = encodeURIComponent(
                "Pawsitive Pet Academy: " + contactSubject
            );

            const emailBody = encodeURIComponent(
                "CONTACT ENQUIRY\n\n" +
                "Name: " + contactName + "\n" +
                "Email: " + contactEmail + "\n" +
                "Phone: " + contactPhone + "\n" +
                "Subject: " + contactSubject + "\n\n" +
                "Message:\n" + contactMessage
            );

            statusMessage.textContent =
                "Your email application will open. Please review and send your enquiry.";

            window.location.href =
                "mailto:somiladlamini740@gmail.com?subject=" +
                emailSubject +
                "&body=" +
                emailBody;

        });

    }


    // =====================================
    // VOLUNTEER LOCATION MAP
    // =====================================

    function createVolunteerMap(mapId) {

        const mapElement = document.getElementById(mapId);

        if (!mapElement || typeof L === "undefined") {
            return;
        }

        // Approximate Durban map centre.
        // Replace these example markers with verified
        // addresses and coordinates before publishing.
        const map = L.map(mapId).setView([-29.8587, 31.0218], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([-29.8587, 31.0218])
            .addTo(map)
            .bindPopup("Durban area - approximate map centre");

    }

    createVolunteerMap("map");
    createVolunteerMap("volunteer-map");

});