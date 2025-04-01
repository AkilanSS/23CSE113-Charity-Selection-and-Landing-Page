export function Dashboard(userData, cData) {
    const userDataComp = JSON.parse(userData)
    const recieptList = userDataComp.userdata.receipts
    var fcData = flattenCharities(cData)

    var nCharities = 0
    var tMoney = 0
    var streak = 0

    var charDateGroup = new Map()
    var charHist = new Set()
    var outerRow = ''

    try {
    recieptList.forEach(char => {
        tMoney += char["contr-money"]
        var uDate = char.date.substr(0, 10)
        var cid = char.id

        charHist.add(cid)

        if (charDateGroup.get(uDate) === undefined) {
            charDateGroup.set(uDate, new Array(char))
        } else {
            charDateGroup.get(uDate).push(char)
        }

    });
    var i = 0;
    Array.from(charDateGroup).forEach(char => {

        var innerRow = ''
        char[1].forEach(cha => {
            var charInfo;
            i++
            fcData.forEach(char => {
                if (cha.id === char.idx) {
                    charInfo = char;
                }
            })

            console.log(charInfo)

            var row = `
                    <div class="char-row" id="row-${i}">
                        <div class="num">#${i}</div>
                        <img src="${charInfo.image}" alt="">
                        <div class="char-name">${charInfo.name}</div>
                        <div class="char-desc">${cha.desc}</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">${'₹' + addCommaToNum(cha['contr-money'])}</div>
                        </div>
                        <div class="contr-ctn" id="don-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">${cha['donation-id']}</div>
                        </div>
                    </div>
                `
            innerRow += row
            if (i == 6) {
                throw new Error("Limit Exceeded");
            }

        })

        outerRow += `
                    <div class="don-list-grp" id="don-list-grp1">
                        <div id="date">${char[0]}</div>
                        <div clas="char-rows">
                            ${innerRow}
                        </div>
                    </div>
            `



    })

    } catch (error) {
        console.log(error);

    } finally {
    return `
        <div id="brand-logo">
            GIVESYNC
        </div>
        <div id="main-head">
            Welcome Back, ${userDataComp.userdata.profile.displayname}!
        </div>
        <hr>
        <div id="stat-ctn">
            <div class="stat-item">
                <span class="stat-item-htext">Total Donations Made</span>
                <span class="stat-item-num">₹${addCommaToNum(tMoney)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-item-htext">Charities Supported</span>
                <span class="stat-item-num">${charHist.size}</span>
            </div>
            <div class="stat-item">
                <span class="stat-item-htext">Giving Streak</span>
                <span class="stat-item-num">4</span>
            </div>
        </div>
        <hr>
        <div id="last-few-don-ctn">
            <h4>Last Few Donations</h4>
            <div id="few-don-ctn">
               ${outerRow}
            </div>
        </div>
    `
    }


}

export function DonationHistory(userData, cData) {
    const userDataComp = JSON.parse(userData)
    const recieptList = userDataComp.userdata.receipts.reverse()
    var fcData = flattenCharities(cData)
    console.log(fcData)


    var nCharities = 0
    var tMoney = 0
    var streak = 0


    var charDateGroup = new Map()
    var outerRow = ''


    recieptList.forEach(char => {
        tMoney += char["contr-money"]
        var uDate = char.date.substr(0, 10)

        if (charDateGroup.get(uDate) === undefined) {
            charDateGroup.set(uDate, new Array(char))
            nCharities += 1
        } else {
            charDateGroup.get(uDate).push(char)
        }

    });
    var i = 0;
    Array.from(charDateGroup).forEach(char => {

        var innerRow = ''
        char[1].forEach(cha => {
            var charInfo;
            i++
            fcData.forEach(char => {
                if (cha.id === char.idx) {
                    charInfo = char;
                }
            })

            console.log(charInfo)

            var row = `
                    <div class="char-row" id="row-${i}">
                        <div class="num">#${i}</div>
                        <img src="${charInfo.image}" alt="">
                        <div class="char-name">${charInfo.name}</div>
                        <div class="char-desc">${cha.desc}</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">${'₹' + addCommaToNum(cha['contr-money'])}</div>
                        </div>
                        <div class="contr-ctn" id="don-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">${cha['donation-id']}</div>
                        </div>
                    </div>
                `
            innerRow += row

        })

        outerRow += `
                    <div class="don-list-grp" id="don-list-grp1">
                        <div id="date">${char[0]}</div>
                        <div clas="char-rows">
                            ${innerRow}
                        </div>
                    </div>
            `



    })



    return `

        <div id="brand-logo">GIVESYNC</div>
        <div id="main-head">Donation History</div>
        <hr />
        <div id="few-don-ctn-hist">
            ${outerRow}
            </div>
        </div>

    `
}

export function SavedCharities(userData, cData, favListArray) {
    var fcData = flattenCharities(cData)
    var sCList = new Array()

    console.log(fcData)
    for (var i = 0; i < fcData.length; i++){
        for (var j = 0; j < favListArray.length; j++){
            if (fcData[i].idx === favListArray[j]){
                sCList.push(fcData[i])
            }
        }
    }

    var ctnHTML = ''

    sCList.forEach(card => {
        var fcDataToRead = fcData.find(item => item.idx === card.idx)

        var cardHTML = `
        <div class="char-ctn" id="char-ctn${card.idx}">
                <div class="img-desc">
                    <img src="${fcDataToRead.image}" alt="">
                <p>${fcDataToRead.description}</p>
                </div>
                <div class="progress-ctn">
                    <div class="text-1">
                        Funding Goals this Month
                    </div>
                    <div class="text-2">
                        ${fcDataToRead.funding.current}/${fcDataToRead.funding.goal}
                    </div>
                    <div class="prog">
                            <div class="progress-bar" style="width: ${fcDataToRead.funding.percentage}%;"></div>
                    </div>
                </div>
                <div class="contr-ctn">
                    <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 10px; gap:20px;">
                        <div class="char-icons">
                            <img src="../assets/icons/link.svg" alt="">
                            <img src="../assets/icons/mail.svg" alt="">
                            <img src="../assets/icons/heart-fill.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `

        ctnHTML += cardHTML
    })

    return `
        <div id="brand-logo">GIVESYNC</div>
        <div id="main-head">Saved Charities</div>
        <hr>
        <div id="char-grid">
                ${ctnHTML}
        </div>

    `
}

export function AccountSettings(userData) {
    const userIData = JSON.parse(userData)
    return `
        <div id="brand-logo">
            GIVESYNC
        </div>
        <div id="main-head">Account Settings</div>
        <hr>
        <div id="first-ctn">
            <div id="form-ctn">
                <div class="form-row-2">
                    <div class="inp-ctn">
                        <span class="ilabel">First Name</span>
                        <input type="text" name="fname" id="fname-inp" value="${userIData.firstName}">
                    </div>
                    <div class="inp-ctn">
                        <span class="ilabel">Last Name</span>
                        <input type="text" name="lname" id="lname-inp" value="${userIData.lastName}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="inp-ctn">
                        <span class="ilabel">E-mail address</span>
                        <input type="email" value="${userIData.email}">
                    </div>
                </div>
                <div class="form-row-2">
                    <div class="inp-ctn">
                        <span class="ilabel">Contact</span>
                        <input type="text" name="fname" id="cont-inp" value="${userIData.contactNo}">
                    </div>
                    <div class="inp-ctn">
                        <span class="ilabel">Country</span>
                        <input type="text" name="lname" id="count-inp" value="${userIData.country}">
                    </div>
                </div>
                <div class="form-row-2">
                    <div class="inp-ctn">
                        <span class="ilabel">City/State</span>
                        <input type="text" name="city" id="city-inp" value="${userIData.cityState}">
                    </div>
                    <div class="inp-ctn">
                        <span class="ilabel">Postal Code</span>
                        <input type="text" name="pcode" id="post-inp" value="${userIData.postalCode}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="inp-ctn">
                        <span class="ilabel">Organization</span>
                        <input type="text" id="org" value="${userIData.organization}">
                    </div>
                </div>
                <div class="form-row-2">
                    <div class="inp-ctn">
                        <span class="ilabel">Industry</span>
                        <input type="text" name="ind" id="ind-inp" value="${userIData.industry}">
                    </div>
                    <div class="inp-ctn">
                        <span class="ilabel">Profession</span>
                        <input type="text" name="prof" id="prof-inp" value="${userIData.profession}">
                    </div>
                </div>
            </div>
            <div id="edit-ctn">
                <div id="profpic-ctn">
                    <img id="edit-icon" src="../assets/icons/edit.svg" alt="" srcset="">
                    <img src="../assets/images/prof_placeholder_large.png" alt="" srcset="">
                    <input id="nickname-txt" value='${userIData.userdata.profile.displayname}' disabled></input>
                    <textarea id="desc" disabled rows="8" cols="10" placeholder="Tell us something about yourself" >${userIData.userdata.profile.userdesc}
                    </textarea>
                </div> 
                <div id="changes-ctn">
                    <button id="cancel-btn" disabled>Cancel</button>
                    <button id="confirm-btn"  disabled >Confirm Changes</button>
                </div>
                
            </div>
        </div>
        <hr>
        <div id="main-head" class="sec-head">Security</div>
        <div id="security-ctn">
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">Connected Accounts</span>
                    <span class="sec-desc">Add and manage accounts associated with yourself</span>
                </div>
                <div class="sec-act">
                    <span class="act-txt">Edit</span>
                    <img src="../assets/icons/edit.svg" alt="">
                </div>
            </div>
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">Password</span>
                    <span class="sec-desc">Set a unique password to protect your account</span>
                </div>
                <div class="sec-act">
                    <span class="act-txt">Change Password</span>
                </div>
            </div>
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">2-Step Verification</span>
                    <span class="sec-desc">Make your password extra secure. Along with it you'll need to enter a
                        code</span>
                </div>
                <div class="sec-act-btn">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">Deactivate your Account</span>
                    <span class="sec-desc">This will shutdown your account. Your accoumt will be reactivated when you
                        login again</span>
                </div>
                <a class="sec-act-lnk" href="">
                    Deactivate
                </a>
            </div>
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">Delete your account</span>
                    <span class="sec-desc">This will delete your account permenantly</span>
                </div>
                <a class="sec-act-lnk del" href="">
                    Delete
                </a>
            </div>
        </div>
    `
}

export function EmptyPage() {
    return `
    
            <h1 id="not-found-txt">The webpage your are looking for is in development!</h1>
        <h1 id="not-found-txt">[ERROR CODE: 1001]</h1>
        <br><br>
        <h3 style="color:#55828B; text-align: center;">:(</h5>
    
    `
}


function addCommaToNum(number) {
    const formatter = new Intl.NumberFormat('en-IN')
    const formattedNumber = formatter.format(number)
    return formattedNumber
}

function remCommaFromNum(number) {
    return parseFloat(number?.replace(/[^\d.]/g, '') || 0)
}

/**
 * Processes the charities JSON data to flatten the structure
 * Removes the categories and returns all charity objects in a single array
 * @param {Object} data - The original JSON data with nested structure
 * @returns {Array} - Flattened array of all charity objects
 */
function flattenCharities(data) {
    const flattenedCharities = [];

    // Check if we have a nested 'charities' object
    const charityData = data.charities || data;

    Object.keys(charityData).forEach(category => {
        // Skip prototype properties
        if (category === '__proto__' || !Array.isArray(charityData[category])) {
            return;
        }

        // Get the array of charities in this category
        const charitiesInCategory = charityData[category];

        // Add each charity object to our flattened array
        charitiesInCategory.forEach(charity => {
            if (charity && typeof charity === 'object' && !Array.isArray(charity)) {
                // Add category information if you want to keep track of it
                charity.category = category;
                flattenedCharities.push({ ...charity }); // Use spread to avoid modifying original data
            }
        });
    });

    return flattenedCharities;
}