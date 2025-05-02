function validateForm() {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input[required]');
    for (let input of inputs) {
        if (!input.value && input.type !== "checkbox") {
            alert(`Please fill out the ${input.name} field.`);
            input.focus();
            return false;
        }
        if (input.type === "checkbox" && !input.checked) {
            alert("Please check the agreement checkbox.");
            return false;
        }
    }
    return true;
}

function resetForm() {
    document.getElementById("form").reset();
    document.getElementById("courses-container").innerHTML = "";
    document.getElementById("generated-content").innerHTML = "";
    document.getElementById("form").style.display = "block";
    document.getElementById("reset-link").style.display = "none";
}

function addCourseField() {
    const container = document.getElementById("courses-container");
    const div = document.createElement("div");
    div.className = "course-field";
    
    const input = document.createElement("input");
    input.type = "text";
    input.name = "course";
    input.placeholder = "Enter a course";
    input.required = true;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => div.remove();

    div.appendChild(input);
    div.appendChild(deleteBtn);
    container.appendChild(div);
}

function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const form = document.getElementById("form");
    const formData = new FormData(form);
    const courses = Array.from(document.getElementsByName("course")).map((course) => course.value);
    const imageFile = formData.get("image");

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = `
            <h2>${formData.get("name")} Intro Page</h2>
            <p><strong>Mascot:</strong> ${formData.get("mascot")}</p>
            <figure>
                <img src="${e.target.result}" alt="Uploaded image" style="max-width: 300px;">
                <figcaption>${formData.get("image-caption")}</figcaption>
            </figure>
            <p><strong>Personal Background:</strong> ${formData.get("personal-background")}</p>
            <p><strong>Professional Background:</strong> ${formData.get("professional-background")}</p>
            <p><strong>Academic Background:</strong> ${formData.get("academic-background")}</p>
            <p><strong>Background in Web Development:</strong> ${formData.get("background-in-web")}</p>
            <p><strong>Primary Computer Platform:</strong> ${formData.get("primary-computer-platform")}</p>
            <p><strong>Courses Currently Taking:</strong></p>
            <ul>${courses.map((course) => `<li>${course}</li>`).join('')}</ul>        
            <p><strong>Funny thing:</strong> ${formData.get("funny-thing")}</p>
            <p><strong>Anything else:</strong> ${formData.get("anything-else")}</p>
        `;

        document.getElementById("form").style.display = "none";
        document.getElementById("generated-content").innerHTML = content;
        document.getElementById("reset-link").style.display = "block";
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
}