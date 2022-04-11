*** Settings ***
Documentation     End to End tests for what to eat app
Library           SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${SERVER}         http://localhost:3000

*** Test Cases ***
App opens and restaurants appear
    Given Open Browser To App Home Page
    Then App Should Be Open And Restaurants Fetched

# Just a demonstration. This test doesn't work in headless mode as webdriver needs fake location
Restaurant fetching works and cards are shown
    Given Open Browser To App Home Page
    Then Restaurants Are Fetched And Cards Are Shown

*** Keywords ***
Open Browser To App Home Page
    Open Browser    ${SERVER}    ${BROWSER}

App Should Be Open And Restaurants Fetched
    Title Should Be    What to eat

Restaurants Are Fetched And Cards Are Shown
    Wait Until Page Does Not Contain    Loading!
    Wait Until Page Contains            Position not allowed!     10s

