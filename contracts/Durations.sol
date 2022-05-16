// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './EnumerableSet.sol';
import './Ownable.sol';

contract Durations is Ownable{

  using EnumerableSet for EnumerableSet.UintSet;
  EnumerableSet.UintSet private values;



  function addDurations(uint256[] calldata durations) external onlyOwner{
    for(uint256 i;i < durations.length;i++){
      values.add(durations[i]);
    }
  }
  
  function _add(uint256[] memory durations) internal {
    for(uint256 i;i < durations.length;i++){
      values.add(durations[i]);
    }
  }

  function removeDurations(uint256[] calldata durations) external onlyOwner{
    for(uint256 i;i < durations.length;i++){
      values.remove(durations[i]);
    }
  }

  function durationValues() external view returns(uint256[] memory){
    return values.values();
  }

  function durationContains(uint256 duration) public view returns(bool){
    return values.contains(duration);
  }
}