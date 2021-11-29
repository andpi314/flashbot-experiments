// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Basic contract for NFT minting
// WARNING: This contract it's  feature-reduced/non-compliant ERC721 token. It should NOT be used in production, as it is missing major functionalitities and security checks
contract MinERC721 {
  // An event stores the arguments passed in transaction logs, which are stored on blockcahin and are accessibile using address of the contract
  // Events are used to inform external users that something happened on the blockchain
  // Solidity events are interfaces with Ethereum Virtual Machine logging functionality
  event Transfer(
    address indexed from,
    address indexed to,
    uint256 indexed tokenId
  );

  string public name;
  string public symbol;

  address public minter;
  uint256 public totalSupply = 0;

  // Mappings are incredibly useful for associations and frequently used to associate unique Ethereum addresses with associated value types.
  mapping(uint256 => address) private _owners; // Hash table from tokenIds to addresses
  mapping(address => uint256) private _balances; // Hash table from addresses to balances

  constructor(string memory name_, string memory symbol_) {
    minter = msg.sender;
    name = name_;
    symbol = symbol_;
  }

  // ---- PUBLIC FUNCTIONS -----
  function balanceOf(address owner) public view returns (uint256) {
    require(owner != address(0), "ERC721: balance query for the zero address");
    return _balances[owner];
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
    address owner = _owners[tokenId];
    require(owner != address(0), "ERC721: owner query for nonexisting token");
    return owner;
  }

  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public {
    require(
      _isApprovedOrOwner(msg.sender, tokenId),
      "ERC721: transfer caller is not owner nor approved"
    );
    _transfer(from, to, tokenId);
  }

  function mint(address to) public returns (uint256) {
    require(
      msg.sender == minter,
      "ERC721: mint can only be called by the minter"
    );
    uint256 tokenIdToMint = ++totalSupply;
    _mint(to, tokenIdToMint);
    return tokenIdToMint;
  }

  // ---- INTERNAL FUNCTIONS ----

  // view functions ensure that will not modify the state
  function _exists(uint256 tokenId) internal view returns (bool) {
    return _owners[tokenId] != address(0);
  }

  function _mint(address to, uint256 tokenId) internal {
    require(to != address(0), "ERC721: mint to the zero address");
    require(!_exists(tokenId), "ERC721: minting non-unique token");

    _balances[to] += 1;
    _owners[tokenId] = to;

    emit Transfer(address(0), to, tokenId);
  }

  function _transfer(
    address from,
    address to,
    uint256 tokenId
  ) internal {
    require(ownerOf(tokenId) == from, "ERC721: transfer from wrong owner");
    require(to != address(0), "ERC721: transfer to the zero address");

    _balances[from] -= 1;
    _balances[to] += 1;
    _owners[tokenId] = to;
    emit Transfer(from, to, tokenId);
  }

  function _isApprovedOrOwner(address spender, uint256 tokenId)
    internal
    view
    returns (bool)
  {
    require(_exists(tokenId), "ERC721: operator query for nonexistent token");
    address owner = ownerOf(tokenId);
    return (spender == owner);
  }
}

contract ArtMinter {
  event FakeNftMinted(address sender, uint256 tokenId);
  uint256 public constant COST = 0.004 ether;

  address payable public owner;
  MinERC721 public minERC721;

  constructor() {
    owner = payable(msg.sender);
    minERC721 = new MinERC721("myFirstBrokenNFT", "brNFT");
  }

  function mint() external payable {
    require(msg.value == COST, "You must send the exact cost for the token");
    uint256 tokenId = minERC721.mint(msg.sender);
    emit FakeNftMinted(msg.sender, tokenId);
    owner.transfer(msg.value);
  }
}
