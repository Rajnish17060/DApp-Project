async function main() {
  // Get the contract to deploy
  const Assessment = await ethers.getContractFactory("Assessment");

  // Deploy the contract with the required constructor arguments
  const greeting = "Hello";  // You can change this
  const number = 0;  // You can change this

  const assessment = await Assessment.deploy(greeting, number);

  console.log("Deploying contracts with the account:", await assessment.signer.getAddress());
  console.log("Account balance:", (await assessment.signer.getBalance()).toString());

  await assessment.deployed();

  console.log("Contract deployed to:", assessment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
