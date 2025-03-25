function Dashboard(userData){
    return `
    <div id="main-ctn">
        <div id="brand-logo">
            GIVESYNC
        </div>
        <div id="main-head">
            Welcome Back, Akilan!
        </div>
        <hr>
        <div id="stat-ctn">
            <div class="stat-item">
                <span class="stat-item-htext">Total Donations Made</span>
                <span class="stat-item-num">₹12,00,240</span>
            </div>
            <div class="stat-item">
                <span class="stat-item-htext">Charities Supported</span>
                <span class="stat-item-num">17</span>
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
                <div class="don-list-grp" id="don-list-grp1">
                    <div id="date">21-03-2025</div>
                    <div clas="char-rows">
                        <div class="char-row" id="row-1">
                            <div class="num">#1</div>
                            <img src="../assets/images/char_img.svg" alt="">
                            <div class="char-name">Feeding America</div>
                            <div class="char-desc">This charity is peak fire ngl</div>
                            <div class="contr-ctn">
                                <div class="contr-txt">Your Contributions</div>
                                <div class="contr-mon">₹15,25,120</div>
                            </div>
                            <div class="contr-ctn" id="don-ctn">
                                <div class="don-txt">Donation ID</div>
                                <div class="don-id">ABXC-1123-C2</div>
                            </div>
                        </div>
                        <div class="char-row" id="row-2">
                            <div class="num">#1</div>
                            <img src="../assets/images/char_img.svg" alt="">
                            <div class="char-name">Feeding America</div>
                            <div class="char-desc">This charity is peak fire ngl</div>
                            <div class="contr-ctn">
                                <div class="contr-txt">Your Contributions</div>
                                <div class="contr-mon">₹15,25,120</div>
                            </div>
                            <div class="contr-ctn">
                                <div class="don-txt">Donation ID</div>
                                <div class="don-id">ABXC-1123-C2</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="don-list-grp" id="don-list-grp2">
                    <div id="date">20-03-2025</div>
                    <div clas="char-rows">
                        <div class="char-row" id="row-1">
                            <div class="num">#1</div>
                            <img src="../assets/images/char_img.svg" alt="">
                            <div class="char-name">Feeding America</div>
                            <div class="char-desc">This charity is peak fire ngl</div>
                            <div class="contr-ctn">
                                <div class="contr-txt">Your Contributions</div>
                                <div class="contr-mon">₹15,25,120</div>
                            </div>
                            <div class="contr-ctn">
                                <div class="don-txt">Donation ID</div>
                                <div class="don-id">ABXC-1123-C2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function DonationHistory(userData){
    return `
    <div id="main-ctn">
        <div id="brand-logo">GIVESYNC</div>
        <div id="main-head">Donation History</div>
        <hr />
        <div id="few-don-ctn-hist">
            <div class="don-list-grp" id="don-list-grp1">
                <div id="date">21-03-2025</div>
                <div clas="char-rows">
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn" id="don-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-2">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="don-list-grp" id="don-list-grp2">
                <div id="date">20-03-2025</div>
                <div clas="char-rows">
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="don-list-grp" id="don-list-grp1">
                <div id="date">21-03-2025</div>
                <div clas="char-rows">
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn" id="don-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-2">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="don-list-grp" id="don-list-grp2">
                <div id="date">20-03-2025</div>
                <div clas="char-rows">
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                    <div class="char-row" id="row-1">
                        <div class="num">#1</div>
                        <img src="../assets/images/char_img.svg" alt="" />
                        <div class="char-name">Feeding America</div>
                        <div class="char-desc">This charity is peak fire ngl</div>
                        <div class="contr-ctn">
                            <div class="contr-txt">Your Contributions</div>
                            <div class="contr-mon">₹15,25,120</div>
                        </div>
                        <div class="contr-ctn">
                            <div class="don-txt">Donation ID</div>
                            <div class="don-id">ABXC-1123-C2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function SavedCharities(userData){
    return `
    <div id="main-ctn">
        <div id="brand-logo">GIVESYNC</div>
        <div id="main-head">Saved Charities</div>
        <hr>
        <div id="char-grid">
            <div class="char-ctn" id="char-ctn2">
                <div class="img-desc">
                    <img src="../assets/images/char_img.svg" alt="">
                <p>Feeding America® is the largest hunger-relief organization in the United States. Feeding America is committed to an America where no one is hungry.</p>
                </div>
                <div class="progress-ctn">
                    <div class="text-1">
                        Funding Goals this Month
                    </div>
                    <div class="text-2">
                        110k/250k
                    </div>
                    <div class="prog">
                            <div class="progress-bar" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="contr-ctn">
                    <div id="text1">Contribute</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap:20px;">
                        <div class="contr-text">
                            <input id="m_area" type="text" placeholder="₹">
                            <button id="lock"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z" stroke="#55828B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button>
                        </div>
                        <div class="char-icons">
                            <img src="../assets/icons/link.svg" alt="">
                            <img src="../assets/icons/mail.svg" alt="">
                            <img src="../assets/icons/heart.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="char-ctn" id="char-ctn2">
                <div class="img-desc">
                    <img src="../assets/images/char_img.svg" alt="">
                <p>Feeding America® is the largest hunger-relief organization in the United States. Feeding America is committed to an America where no one is hungry.</p>
                </div>
                <div class="progress-ctn">
                    <div class="text-1">
                        Funding Goals this Month
                    </div>
                    <div class="text-2">
                        110k/250k
                    </div>
                    <div class="prog">
                            <div class="progress-bar" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="contr-ctn">
                    <div id="text1">Contribute</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap:20px;">
                        <div class="contr-text">
                            <input id="m_area" type="text" placeholder="₹">
                            <button id="lock"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z" stroke="#55828B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button>
                        </div>
                        <div class="char-icons">
                            <img src="../assets/icons/link.svg" alt="">
                            <img src="../assets/icons/mail.svg" alt="">
                            <img src="../assets/icons/heart.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="char-ctn" id="char-ctn2">
                <div class="img-desc">
                    <img src="../assets/images/char_img.svg" alt="">
                <p>Feeding America® is the largest hunger-relief organization in the United States. Feeding America is committed to an America where no one is hungry.</p>
                </div>
                <div class="progress-ctn">
                    <div class="text-1">
                        Funding Goals this Month
                    </div>
                    <div class="text-2">
                        110k/250k
                    </div>
                    <div class="prog">
                            <div class="progress-bar" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="contr-ctn">
                    <div id="text1">Contribute</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap:20px;">
                        <div class="contr-text">
                            <input id="m_area" type="text" placeholder="₹">
                            <button id="lock"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z" stroke="#55828B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button>
                        </div>
                        <div class="char-icons">
                            <img src="../assets/icons/link.svg" alt="">
                            <img src="../assets/icons/mail.svg" alt="">
                            <img src="../assets/icons/heart.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="char-ctn" id="char-ctn2">
                <div class="img-desc">
                    <img src="../assets/images/char_img.svg" alt="">
                <p>Feeding America® is the largest hunger-relief organization in the United States. Feeding America is committed to an America where no one is hungry.</p>
                </div>
                <div class="progress-ctn">
                    <div class="text-1">
                        Funding Goals this Month
                    </div>
                    <div class="text-2">
                        110k/250k
                    </div>
                    <div class="prog">
                            <div class="progress-bar" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="contr-ctn">
                    <div id="text1">Contribute</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap:20px;">
                        <div class="contr-text">
                            <input id="m_area" type="text" placeholder="₹">
                            <button id="lock"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4.66667 7.33334V4.66668C4.66584 3.84004 4.97219 3.04259 5.52625 2.42912C6.08031 1.81566 6.84255 1.42995 7.665 1.34687C8.48745 1.26379 9.31143 1.48928 9.97698 1.97955C10.6425 2.46983 11.1022 3.18991 11.2667 4.00001M3.33333 7.33334H12.6667C13.403 7.33334 14 7.9303 14 8.66668V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8.66668C2 7.9303 2.59695 7.33334 3.33333 7.33334Z" stroke="#55828B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></button>
                        </div>
                        <div class="char-icons">
                            <img src="../assets/icons/link.svg" alt="">
                            <img src="../assets/icons/mail.svg" alt="">
                            <img src="../assets/icons/heart.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

export function AccountSettings(userData){
    return `
    <div id="main-ctn">
        <div id="brand-logo">
            GIVESYNC
        </div>
        <div id="main-head">Account Settings</div>
        <hr>
        <div id="form-ctn">

        </div>
        <hr>
        <div id="main-head">Security</div>
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
                    <span class="sec-desc">Make your password extra secure. Along with it you'll need to enter a code</span>
                </div>
                <div class="sec-act-btn">
                    <label class="switch">
                        <input type="checkbox" >
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="sec-row">
                <div class="sec-txt">
                    <span class="sec-title">Deactivate your Account</span>
                    <span class="sec-desc">This will shutdown your account. Your accoumt will be reactivated when you login again</span>
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
    </div>
    `
}
