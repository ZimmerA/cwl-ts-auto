
import * as Internal from './util/internal'


/**
 * Auto-generated interface for https://w3id.org/cwl/cwl#ScatterFeatureRequirement
 *
 * Indicates that the workflow platform must support the `scatter` and
 * `scatterMethod` fields of [WorkflowStep](#WorkflowStep).
 * 
 */
export interface ScatterFeatureRequirementProperties extends Internal.ProcessRequirementProperties {
                    
  extensionFields?: Internal.Dictionary<any>
                    
  /**
   * Always 'ScatterFeatureRequirement'
   */
  class_: string
}